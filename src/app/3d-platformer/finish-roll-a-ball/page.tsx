"use client"
import { usePathname } from "next/navigation";
import TutorialSection from "@/components/TutorialSection";
import { tutorialSeries, tutorialSeriesName } from "../tutorialSeries";
import type { ChecklistItem } from "@/components/TutorialSection";

const checklist: ChecklistItem[] = [
  {
    text: `A 3D platformer can be made from a finished Roll-a-ball tutorial game using with a few steps.\n\n
    \nFinish the Roll-a-ball tutorial and come back here when done.`,
    links: [{ href: "https://learn.unity.com/project/roll-a-ball", label: "Roll-a-ball Tutorial" }],
  },
];

export default function FinishRollABallPage() {
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
