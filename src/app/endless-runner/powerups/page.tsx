 "use client"
 import { usePathname } from "next/navigation";
 import TutorialSection from "@/components/TutorialSection";
 import { tutorialSeries, tutorialSeriesName } from "../tutorialSeries";
 import type { ChecklistItem } from "@/components/TutorialSection";
 
 const checklist: ChecklistItem[] = [
   {
     text: "Add this code to the PlayerController script, underneath \"public TMP_Text scoreText;\".",
     code: `private float speedBoostTimer = 0f;
private float originalSpeed;`
   },
   {
    text: "Add this code to the bottom of the Update() function.",
    code: `    if (speedBoostTimer > 0f)
    {
        speedBoostTimer -= Time.deltaTime;
        if (speedBoostTimer <= 0f)
        {
            forwardSpeed = originalSpeed;
        }
    }`
   },
   {
    text: "Create a new function called void OnTriggerEnter(). Add this code underneath the new variables (\"private float originalSpeed\").",
    code: `void OnTriggerEnter(Collider other)
{
    if (other.CompareTag("SpeedPowerup"))
    {
        // Simple speed boost: +5 for 5 seconds
        originalSpeed = forwardSpeed;
        forwardSpeed += 5f;
        speedBoostTimer = 5f;
        Destroy(other.gameObject);
    }
}`
   },
    {
     text: "Go back to the Unity Editor. Create a new GameObject with a 3D object (like a cube), and name it SpeedPowerup. Make sure it has a box collider component. Place it a little ways in front of your player so your player can collect it. ",
    },
    {
        text: "Drag and drop the SpeedPowerup GameObject into the Prefabs folder. Recall this creates a reusable template."
    },
    {
        text: "Click SpeedPowerup in the Hierarchy. In the Inspector, under the Box Collider component, check the Is Trigger box. This allows the player to pass through it and trigger the OnTriggerEnter function in PlayerController.",
    },
    {
        text: "With SpeedPowerup still selected, in the Inspector, go to the Tag dropdown and select Add Tag."
    },
    {
        text: "Click + to add a new tag, and name it SpeedPowerup. This is case sensitive, make sure it looks like this."
    },
    {
        text: "Go back to the SpeedPowerup GameObject in the Hierarchy, and select the SpeedPowerup tag from the Tag dropdown.",
    },
    {
        text: "Click play to test your game. You should be able to collect the SpeedPowerup and see your speed increase for 5 seconds.",
    }
 ];
 
 export default function PowerupsPage() {
 
   const pathname = usePathname();
   return (
     <main>
       <h1>Endless Runner Guided Tutorials Video Series</h1>
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

/*private float speedBoostTimer = 0f;
private float originalSpeed;*/ 