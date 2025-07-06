 "use client"
 import { usePathname } from "next/navigation";
 import TutorialSection from "@/components/TutorialSection";
 import { tutorialSeries, tutorialSeriesName } from "../tutorialSeries";
 import type { ChecklistItem } from "@/components/TutorialSection";
 
 const checklist: ChecklistItem[] = [
   {
     text: "Watch this video to start learning about interactables.",
            
   }
     /*  <ol>
        <li><label><input type="checkbox">Add this code to the PlayerController script directly under <code>public LayerMask groundLayer;</code>:
                <div style="position: relative;">
    <button onclick="copyCode(this)" style="position: absolute; top: 0; right: 0; z-index: 2;">Copy</button><pre class="language-csharp"><code>

        </label></li>
        <li><label><input type="checkbox">Add this code to the PlayerController script directly under <code>void Update(){</code>:
                <div style="position: relative;">
    <button onclick="copyCode(this)" style="position: absolute; top: 0; right: 0; z-index: 2;">Copy</button><pre class="language-csharp"> <code></code></pre></div>
        </label></li>
        <li><label><input type="checkbox"></code>:
            <div style="position: relative;">
    <button onclick="copyCode(this)" style="position: absolute; top: 0; right: 0; z-index: 2;">Copy</button><pre class="language-csharp"><code>
</code></pre></div>
        </label></li>
    </ol>*/

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