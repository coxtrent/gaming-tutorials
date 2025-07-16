 "use client"
 import { usePathname } from "next/navigation";
 import TutorialSection from "@/components/TutorialSection";
 import { tutorialSeries, tutorialSeriesName } from "../tutorialSeries";
 import type { ChecklistItem } from "@/components/TutorialSection";
 
 const checklist: ChecklistItem[] = [
   {
     text: "Add this code to the PlayerController script directly under the line with \"public LayerMask groundLayer;\":",
     code:`    public float laneOffset = 4f; // Distance between lanes
    private int currentLane = 1; // 0 = left, 1 = center, 2 = right
    private int numLanes = 3;
    public float laneChangeSpeed = 10f;`
   },
   {text: "Add this code to the PlayerController script directly under the line with \"void Update()\":",
    code: `       // Keyboard input for lane change (can be replaced with touch/swipe)
        if (Keyboard.current.leftArrowKey.wasPressedThisFrame)
            ChangeLane(-1);
        if (Keyboard.current.rightArrowKey.wasPressedThisFrame)
            ChangeLane(1);

        // Smoothly move to target lane position
        Vector3 pos = transform.position;
        float targetX = (currentLane - 1) * laneOffset;
        pos.x = Mathf.Lerp(pos.x, targetX, laneChangeSpeed * Time.deltaTime);
        transform.position = pos;`
   },
   {text: "Lastly, paste this code directly above void OnJump()",
    code: `    void ChangeLane(int direction)
    {
        currentLane = Mathf.Clamp(currentLane + direction, 0, numLanes - 1);
    }
            `
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
 
 export default function LanesPage() {
 
   const pathname = usePathname();
   return (
     <main>
       <h1>Endless Runner Guided Tutorials Video Series</h1>
       <TutorialSection
         videoSrc="/Endless-Runner-Tutorials/2Lanes.mp4"
         checklist={checklist}
         tutorialSeries={tutorialSeries}
         currentHref={pathname}
         storageKey={tutorialSeriesName}
       />
     </main>
   );
 }