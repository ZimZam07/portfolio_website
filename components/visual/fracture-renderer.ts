import {
  FRAGMENT_SHADER,
  PALETTES,
  VERTEX_SHADER,
  type FracturePalette,
} from "@/components/visual/fracture-shader";

/**
 * Imperative WebGL renderer for the fracture surface, deliberately kept
 * outside React.
 *
 * The lifecycle rule that matters: a WebGL context belongs to its canvas
 * element for that element's whole life. It must be created once per canvas
 * and never torn down while the canvas is still mounted — changing the
 * theme is a *uniform update*, not a reason to rebuild anything.
 *
 * Notably absent: `WEBGL_lose_context.loseContext()`. Calling it kills the
 * context permanently, and any later `getContext()` on the same canvas
 * returns that dead context, so every subsequent draw silently no-ops.
 * Dropping the canvas node is enough — the context is collected with it.
 */

const CONFIG = {
  /** Internal render scale. The surface is low-frequency, so rendering
   *  under-resolution and letting the compositor upscale is nearly free
   *  visually and materially cheaper per frame. */
  renderScale: { fine: 0.7, coarse: 0.5 },
  /** DPR ceiling — 3x on a phone is a 9x fill-rate cost for no benefit. */
  maxDpr: 1.5,
  density: { fine: 13.0, coarse: 8.0 },
  radius: { fine: 2.6, coarse: 3.2 },
  push: { fine: 0.3, coarse: 0.16 },
  /** Pointer easing per frame. Low value = weighty, with visible recovery. */
  pointerEase: 0.075,
  activeEase: 0.05,
};

export type FractureRenderer = {
  setPalette(palette: FracturePalette): void;
  setReducedMotion(reduced: boolean): void;
  destroy(): void;
};

const isDev = process.env.NODE_ENV !== "production";

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (isDev) {
      console.error(
        "[fracture] shader compile failed:",
        gl.getShaderInfoLog(shader),
      );
    }
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createFractureRenderer(
  canvas: HTMLCanvasElement,
): FractureRenderer | null {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });

  if (!gl) return null;

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const scale = coarse ? CONFIG.renderScale.coarse : CONFIG.renderScale.fine;

  let program: WebGLProgram | null = null;
  let vertexShader: WebGLShader | null = null;
  let fragmentShader: WebGLShader | null = null;
  let buffer: WebGLBuffer | null = null;

  let uRes: WebGLUniformLocation | null = null;
  let uPointer: WebGLUniformLocation | null = null;
  let uActive: WebGLUniformLocation | null = null;
  let uDensity: WebGLUniformLocation | null = null;
  let uRadius: WebGLUniformLocation | null = null;
  let uPush: WebGLUniformLocation | null = null;
  let uSurface: WebGLUniformLocation | null = null;
  let uDeep: WebGLUniformLocation | null = null;
  let uAccent: WebGLUniformLocation | null = null;
  let uSeamBase: WebGLUniformLocation | null = null;

  let width = 0;
  let height = 0;
  let frame = 0;
  let looping = false;
  let destroyed = false;
  let ready = false;
  let reducedMotion = false;
  let palette: FracturePalette = PALETTES.dark;

  const target = { x: 0.5, y: 0.5, active: 0 };
  const current = { x: 0.5, y: 0.5, active: 0 };
  const started = performance.now();

  function applyPalette() {
    if (!ready) return;
    gl!.uniform3fv(uSurface, new Float32Array(palette.surface));
    gl!.uniform3fv(uDeep, new Float32Array(palette.deep));
    gl!.uniform3fv(uAccent, new Float32Array(palette.accent));
    gl!.uniform1f(uSeamBase, palette.seamBase);
  }

  /** Builds (or rebuilds, after a context restore) all GPU-side state. */
  function build(): boolean {
    vertexShader = compile(gl!, gl!.VERTEX_SHADER, VERTEX_SHADER);
    fragmentShader = compile(gl!, gl!.FRAGMENT_SHADER, FRAGMENT_SHADER);
    program = gl!.createProgram();
    if (!vertexShader || !fragmentShader || !program) return false;

    gl!.attachShader(program, vertexShader);
    gl!.attachShader(program, fragmentShader);
    gl!.linkProgram(program);

    if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
      if (isDev) {
        console.error(
          "[fracture] program link failed:",
          gl!.getProgramInfoLog(program),
        );
      }
      return false;
    }

    gl!.useProgram(program);

    buffer = gl!.createBuffer();
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer);
    gl!.bufferData(
      gl!.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl!.STATIC_DRAW,
    );
    const aPosition = gl!.getAttribLocation(program, "aPosition");
    gl!.enableVertexAttribArray(aPosition);
    gl!.vertexAttribPointer(aPosition, 2, gl!.FLOAT, false, 0, 0);

    uRes = gl!.getUniformLocation(program, "uRes");
    uPointer = gl!.getUniformLocation(program, "uPointer");
    uActive = gl!.getUniformLocation(program, "uActive");
    uDensity = gl!.getUniformLocation(program, "uDensity");
    uRadius = gl!.getUniformLocation(program, "uRadius");
    uPush = gl!.getUniformLocation(program, "uPush");
    uSurface = gl!.getUniformLocation(program, "uSurface");
    uDeep = gl!.getUniformLocation(program, "uDeep");
    uAccent = gl!.getUniformLocation(program, "uAccent");
    uSeamBase = gl!.getUniformLocation(program, "uSeamBase");

    gl!.uniform1f(uDensity, coarse ? CONFIG.density.coarse : CONFIG.density.fine);
    gl!.uniform1f(uRadius, coarse ? CONFIG.radius.coarse : CONFIG.radius.fine);
    gl!.uniform1f(uPush, coarse ? CONFIG.push.coarse : CONFIG.push.fine);

    ready = true;
    applyPalette();

    // Force the next resize() to re-upload dimensions.
    width = 0;
    height = 0;
    return true;
  }

  function teardownGpuState() {
    if (!gl) return;
    gl.useProgram(null);
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
    if (vertexShader) gl.deleteShader(vertexShader);
    if (fragmentShader) gl.deleteShader(fragmentShader);
    buffer = null;
    program = null;
    vertexShader = null;
    fragmentShader = null;
    ready = false;
  }

  function resize(): boolean {
    const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxDpr);
    const w = Math.max(1, Math.round(window.innerWidth * dpr * scale));
    const h = Math.max(1, Math.round(window.innerHeight * dpr * scale));
    if (w === width && h === height) return false;
    width = w;
    height = h;
    canvas.width = w;
    canvas.height = h;
    gl!.viewport(0, 0, w, h);
    gl!.uniform2f(uRes, w, h);
    return true;
  }

  function draw() {
    if (!ready || destroyed || gl!.isContextLost()) return;
    // gl_FragCoord is bottom-left origin; pointer fractions are top-left.
    gl!.uniform2f(uPointer, current.x * width, (1 - current.y) * height);
    gl!.uniform1f(uActive, current.active);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
  }

  function tick(now: number) {
    if (!looping || destroyed) return;

    if (coarse) {
      // No hover to follow — a slow Lissajous drift keeps the surface alive
      // without asking anything of the user.
      const t = (now - started) / 1000;
      target.x = 0.5 + 0.28 * Math.sin(t * 0.11);
      target.y = 0.5 + 0.22 * Math.cos(t * 0.083);
      target.active = 0.5;
    }

    current.x += (target.x - current.x) * CONFIG.pointerEase;
    current.y += (target.y - current.y) * CONFIG.pointerEase;
    current.active += (target.active - current.active) * CONFIG.activeEase;

    resize();
    draw();
    frame = requestAnimationFrame(tick);
  }

  function startLoop() {
    if (looping || destroyed || reducedMotion || document.hidden) return;
    looping = true;
    frame = requestAnimationFrame(tick);
  }

  function stopLoop() {
    looping = false;
    cancelAnimationFrame(frame);
  }

  /** One settled frame — used for reduced motion and after a palette change
   *  while the loop isn't running. */
  function renderStatic() {
    current.active = 0;
    target.active = 0;
    resize();
    draw();
  }

  function onPointerMove(event: PointerEvent) {
    target.x = event.clientX / window.innerWidth;
    target.y = event.clientY / window.innerHeight;
    target.active = 1;
  }

  function onPointerLeave() {
    target.active = 0;
  }

  function onResize() {
    if (resize() && !looping) draw();
  }

  function onVisibility() {
    if (document.hidden) stopLoop();
    else startLoop();
  }

  function onContextLost(event: Event) {
    // Without preventDefault the context can never be restored.
    event.preventDefault();
    stopLoop();
    ready = false;
  }

  function onContextRestored() {
    if (destroyed) return;
    if (build()) {
      if (reducedMotion) renderStatic();
      else startLoop();
    }
  }

  canvas.addEventListener("webglcontextlost", onContextLost);
  canvas.addEventListener("webglcontextrestored", onContextRestored);
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);

  if (!coarse) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);
  }

  if (!build()) {
    teardownGpuState();
    return null;
  }

  renderStatic();
  startLoop();

  return {
    setPalette(next) {
      palette = next;
      applyPalette();
      // The loop repaints on its own; when it isn't running (reduced
      // motion, hidden tab) the new palette still has to land immediately,
      // otherwise the canvas keeps showing the previous theme.
      if (!looping) draw();
    },

    setReducedMotion(reduced) {
      if (reduced === reducedMotion) return;
      reducedMotion = reduced;
      if (reduced) {
        stopLoop();
        renderStatic();
      } else {
        startLoop();
      }
    },

    destroy() {
      if (destroyed) return;
      destroyed = true;
      stopLoop();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      teardownGpuState();
    },
  };
}
