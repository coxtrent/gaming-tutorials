 "use client"
 import { usePathname } from "next/navigation";
 import TutorialSection from "@/components/TutorialSection";
 import { tutorialSeries, tutorialSeriesName } from "../tutorialSeries";
 import type { ChecklistItem } from "@/components/TutorialSection";
 
 const checklist: ChecklistItem[] = [
   {
     text: "Watch this video to learn about setting up the camera in 1st person mode..",       
   },
 ];
 
 export default function EndlessRunnerPage() {
 
   const pathname = usePathname();
   return (
     <main>
       <h1>1st Person Guided Tutorials Video Series</h1>
       <TutorialSection
         videoSrc="/1st-Person-Tutorials/1CameraController.mp4"
         checklist={checklist}
         tutorialSeries={tutorialSeries}
         currentHref={pathname}
         storageKey={tutorialSeriesName}
       />
     </main>
   );
 }