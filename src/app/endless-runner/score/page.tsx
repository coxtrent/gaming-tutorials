 "use client"
 import { usePathname } from "next/navigation";
 import TutorialSection from "@/components/TutorialSection";
 import { tutorialSeries, tutorialSeriesName } from "../tutorialSeries";
 import type { ChecklistItem } from "@/components/TutorialSection";
 
 const checklist: ChecklistItem[] = [
   {
     text: "In order to use text in your game, add this line to the top of your PlayerController script, underneath the \"using UnityEngine;\" line.",
     code: `using TMPro;`,
   },
   {
    text: "Add this code underneath the line that says \"private float startZ;\"",
    code: `private float startZ;
    public float score = 0f;
    public TMP_Text scoreText;`
   },
   {
    text: "Add this code as the last line of the void Start() function in the PlayerController script, under \"rb = GetComponent<Rigidbody>();\"",
    code: `        startZ = transform.position.z;`
   },
   {
    text: "Add this code as the last lines of void Update(), under \"transform.position = pos;\".",
    code: `        score = transform.position.z - startZ;
        if (scoreText != null)
            scoreText.text = ((int)score).ToString("D6");`
   },
   {
   text: "OPTIONAL: You can send messages to the Console tab in the lower right of Unity with Debug.Log(\"Your message goes in here\");. Add that line at the end of the void Update() function to see your score in the Console tab.",
   code: `        Debug.Log($"Score: {score}"); `
   },
   {
    text: "Go back to the Unity window. Control+Click on the Canvas, go to UI, and create a new Text - TextMeshPro object. Name it \"ScoreText\".",
   },
   {
    text: "Move the ScoreText object to whatever corner of the canvas you'd like. Remember that this canvas is essentially gonna be the screen while the game is running."
   },
   {
    text: "Select Player in the Hierarchy. Drag and drop the ScoreText object from the Hierarchy into the Score Text field of the PlayerController script in the Inspector tab.",
   },
   {
    text: "For some reason, this did not always work for me. You might have to refresh the PlayerController script by removing it and adding it back to the Player object in the Hierarchy and dragging the ScoreText back in.",
   },
 ];
 
 export default function ScorePage() {
 
   const pathname = usePathname();
   return (
     <main>
       <h1>Endless Runner Guided Tutorials Video Series</h1>
       <TutorialSection
         videoSrc="/Endless-Runner-Tutorials/4Score.mp4"
         checklist={checklist}
         tutorialSeries={tutorialSeries}
         currentHref={pathname}
         storageKey={tutorialSeriesName}
       />
     </main>
   );
 }

 