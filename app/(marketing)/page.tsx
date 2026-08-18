import { HeroSection } from "@/components/sections/hero-section";
import { AvailabilitySection } from "@/components/sections/availability-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { ExperiencePreviewSection } from "@/components/sections/experience-preview-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { getAvailability } from "@/lib/content/availability";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getRecentExperience } from "@/lib/content/experience";
import { getHomepageSkillGroups } from "@/lib/content/skills";

export default function Home() {
  const availability = getAvailability();

  return (
    // The fracture background and its scrim now live in the segment
    // layout, so they persist across navigation instead of remounting per
    // page. See app/(marketing)/layout.tsx.
    <div className="flex flex-col gap-14 lg:gap-32">
      <HeroSection statusLabel={availability.currentStatus} />
      <AvailabilitySection availability={availability} />
      <FeaturedProjectsSection projects={getFeaturedProjects()} />
      <ExperiencePreviewSection experience={getRecentExperience()} />
      {/* CurrentlyBuildingSection is intentionally not rendered: its content
          module is still the untouched scaffold, and a card reading
          "Untitled project" is worse than no card. The component and its
          content module remain in place — restore this line once there's
          something real to announce. */}
      <SkillsSection groups={getHomepageSkillGroups()} />
      <ContactCtaSection />
    </div>
  );
}
