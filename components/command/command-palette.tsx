"use client";

import { useRouter } from "next/navigation";
import {
  FileText,
  Link2,
  Mail,
  Moon,
  Sparkles,
  Sun,
  UserRound,
} from "lucide-react";
import { siGithub, siLeetcode } from "simple-icons";
import { useTheme } from "next-themes";

import { BrandIcon } from "@/components/ui/brand-icon";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { primaryNavItems, siteConfig, socialLinks } from "@/lib/constants";
import { useCommandPalette } from "@/components/command/command-palette-provider";

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  function runCommand(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description={`Search ${siteConfig.name}'s portfolio or jump to a page`}
    >
      <CommandInput placeholder="Search or jump to..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
            <UserRound />
            Home
          </CommandItem>
          {primaryNavItems.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => runCommand(() => router.push(item.href))}
            >
              {item.label}
            </CommandItem>
          ))}
          <CommandItem
            onSelect={() =>
              runCommand(() => window.open(siteConfig.resumeUrl, "_blank"))
            }
          >
            <FileText />
            Resume
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/recruiter"))}
          >
            <Sparkles />
            Recruiter Mode
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() =>
              runCommand(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
            }
          >
            {resolvedTheme === "dark" ? <Sun /> : <Moon />}
            Toggle theme
          </CommandItem>
        </CommandGroup>

        {(socialLinks.github || socialLinks.linkedin || socialLinks.leetcode) && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Connect">
              {socialLinks.github && (
                <CommandItem
                  onSelect={() =>
                    runCommand(() => window.open(socialLinks.github, "_blank"))
                  }
                >
                  <BrandIcon icon={siGithub} className="size-4" />
                  GitHub
                </CommandItem>
              )}
              {socialLinks.linkedin && (
                <CommandItem
                  onSelect={() =>
                    runCommand(() => window.open(socialLinks.linkedin, "_blank"))
                  }
                >
                  <Link2 />
                  LinkedIn
                </CommandItem>
              )}
              {socialLinks.leetcode && (
                <CommandItem
                  onSelect={() =>
                    runCommand(() => window.open(socialLinks.leetcode, "_blank"))
                  }
                >
                  <BrandIcon icon={siLeetcode} className="size-4" />
                  LeetCode
                </CommandItem>
              )}
              <CommandItem
                onSelect={() =>
                  runCommand(() =>
                    window.open(`mailto:${siteConfig.email}`, "_self"),
                  )
                }
              >
                <Mail />
                Email
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
