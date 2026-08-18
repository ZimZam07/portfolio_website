/**
 * GLSL for the landing-page fracture surface.
 *
 * WebGL1 / GLSL ES 1.00 deliberately: this needs one fullscreen quad and a
 * fragment shader, so WebGL2 buys nothing and WebGL1 has broader support
 * (notably older iOS). Pulling in a 3D library for a single quad would add
 * ~150KB gzipped to draw two triangles.
 *
 * The fracture is a Voronoi tessellation — irregular convex cells, which is
 * what real fractured surfaces produce, rather than the uniform triangles a
 * naive mesh would give. Each cell is pushed radially away from the pointer
 * by a per-cell random amount, so the seams between cells widen and the
 * darker layer beneath shows through. Cells recover when the pointer
 * leaves because the push is a pure function of pointer distance.
 */

export const VERTEX_SHADER = /* glsl */ `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform vec2  uRes;        // drawing-buffer size, px
uniform vec2  uPointer;    // pointer position, px, gl_FragCoord space
uniform float uActive;     // 0..1 pointer presence, eased
uniform float uDensity;    // cells across one screen height
uniform float uRadius;     // influence radius, grid units
uniform float uPush;       // max cell separation, grid units
uniform vec3  uSurface;    // intact surface colour
uniform vec3  uDeep;       // colour revealed through the cracks
uniform vec3  uAccent;     // restrained tint near the pointer
uniform float uSeamBase;   // hairline seam width at rest

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

float hash1(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

/** Gaussian falloff — smooth everywhere, so there's no visible edge to the
 *  interaction radius the way a linear or smoothstep cutoff would give. */
float falloff(float d) {
  float t = d / uRadius;
  return exp(-t * t);
}

/** Per-cell displacement: radially away from the pointer, scaled by the
 *  falloff and a per-cell random so shards don't move in lockstep. */
vec2 cellPush(vec2 cell, vec2 pointer) {
  vec2 away = cell - pointer;
  float dist = length(away);
  if (dist < 0.0001) return vec2(0.0);
  float w = uActive * falloff(dist);
  float variance = 0.55 + 0.9 * hash1(cell + 7.31);
  return (away / dist) * w * uPush * variance;
}

void main() {
  vec2 frag = gl_FragCoord.xy;

  // Work in units of screen height so cells stay square at any aspect.
  vec2 p = frag / uRes.y;
  vec2 pointer = uPointer / uRes.y;

  vec2 x = p * uDensity;
  vec2 pg = pointer * uDensity;

  vec2 n = floor(x);
  vec2 f = fract(x);

  // Pass 1 — find the owning cell, with displacement applied.
  vec2 closestOffset = vec2(0.0);
  vec2 closestCell = vec2(0.0);
  float minDist = 8.0;

  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 jitter = hash2(n + g);
      vec2 seed = n + g + jitter;
      vec2 r = g + jitter + cellPush(seed, pg) - f;
      float d = dot(r, r);
      if (d < minDist) {
        minDist = d;
        closestOffset = r;
        closestCell = g;
      }
    }
  }

  // Pass 2 — distance to the nearest seam between this cell and its
  // neighbours. This is what draws the cracks; it widens automatically as
  // pass 1 pushes neighbouring cells apart.
  float seam = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = closestCell + vec2(float(i), float(j));
      vec2 jitter = hash2(n + g);
      vec2 seed = n + g + jitter;
      vec2 r = g + jitter + cellPush(seed, pg) - f;
      vec2 diff = r - closestOffset;
      if (dot(diff, diff) > 0.00001) {
        seam = min(seam, dot(0.5 * (closestOffset + r), normalize(diff)));
      }
    }
  }

  float local = uActive * falloff(length(x - pg));

  // Seams are a hairline at rest and open up under the pointer.
  float width = uSeamBase + 0.16 * local;
  float crack = 1.0 - smoothstep(0.0, width, seam);

  // Per-cell tonal variation so the intact surface still reads as facets.
  float cellId = hash1(n + closestCell);
  vec3 surface = uSurface * (0.86 + 0.28 * cellId);
  surface = mix(surface, uAccent, 0.06 + 0.30 * local);

  vec3 color = mix(surface, uDeep, crack);

  // A single-pixel lift just inside each seam reads as a shard edge catching
  // light. Kept faint — this is the detail that tips into "cheap glass" if
  // it's pushed.
  float rim = (1.0 - smoothstep(width, width * 2.6, seam)) * (1.0 - crack);
  color += rim * (0.035 + 0.075 * local) * uAccent;

  // Static grain, not animated: a time-varying term shimmers on flat areas
  // and reads as noise rather than texture.
  color += (hash1(frag) - 0.5) * 0.010;

  gl_FragColor = vec4(color, 1.0);
}
`;

export type FracturePalette = {
  readonly surface: readonly [number, number, number];
  readonly deep: readonly [number, number, number];
  readonly accent: readonly [number, number, number];
  readonly seamBase: number;
};

/** Palettes stay in sync with the tokens in app/globals.css. */
export const PALETTES: Record<"dark" | "light", FracturePalette> = {
  dark: {
    surface: [0.055, 0.058, 0.070],
    deep: [0.020, 0.022, 0.028],
    accent: [0.145, 0.150, 0.290],
    seamBase: 0.016,
  },
  light: {
    surface: [0.965, 0.965, 0.972],
    deep: [0.870, 0.872, 0.885],
    accent: [0.560, 0.575, 0.820],
    seamBase: 0.014,
  },
} as const;
