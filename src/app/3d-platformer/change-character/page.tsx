"use client"
import { usePathname } from "next/navigation";
import TutorialSection from "@/components/TutorialSection";
import { tutorialSeries, tutorialSeriesName } from "../tutorialSeries";
import type { ChecklistItem } from "@/components/TutorialSection";

const checklist: ChecklistItem[] = [
  {
    text: "Tutorial under construction. Check back soon.",
  },
];

export default function ChangeCharacterPage() {

  const pathname = usePathname();
  return (
    <main>
      <h1>3D Platformer Guided Tutorials Video Series</h1>
      <TutorialSection
        videoSrc=""
        checklist={checklist}
        tutorialSeries={tutorialSeries}
        currentHref={pathname}
        storageKey={tutorialSeriesName}
      />
    </main>
  );
}
