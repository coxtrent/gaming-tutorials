"use client"
import { usePathname } from "next/navigation";
import TutorialSection from "@/components/TutorialSection";
import { tutorialSeries, tutorialSeriesName } from "../tutorialSeries";
import type { ChecklistItem } from "@/components/TutorialSection";

const checklist: ChecklistItem[] = [
  {text: "Create a Universal 3D project in Unity.",},
  {
    text: "Download the PlayerController and CameraController scripts.",
    downloads: [{ href: "/PlayerController.cs", label: "PlayerController.cs" }, { href: "/CameraController.cs", label: "CameraController.cs" }],
},
  { text: "In your new project, in the File Explorer area (Project tab), Ctrl+Click > Create > Folder. Name it 'Scripts'." },
  {text: "Drag the downloaded scripts into the 'Scripts' folder.",},
  { text: "In the Hierarchy tab, control-click > Create > 3D Object > Pick a shape. I used a Sphere. Name it 'Player'." },
  { text: "In the Inspector tab, click 'Add Component' and add a 'Rigidbody' component. Freeze X Position, Freeze X and Z Rotation." },
    { text: "With the Player object still selected in the Hierarchy, look at the Inspector tab. Click 'Add Component' and add the 'PlayerController' script." },    { text: "In the Hierarchy section, add a ground - make it a cube. Name it 'Ground'." },
    { text: "Select the ground in the Hierarchy. Then, in the Inspector tab, create a new layer for the ground by clicking the \"Layer\" dropdown menu, clicking \"Add Layer\", and choose an unused layer. Name it 'Ground'." },    
    { text: "In the Inspector tab, set the 'Scale' of the Ground object to X=10, Y=1, Z=40." },
    { text: "With Ground still selected in the Hierarchy, in the Inspector tab, go back to the \"Layer\" dropdown menu and set the layer of the Ground object to 'Ground'." },
    { text: "Select the Player object in the Hierarchy. In the Inspector tab, near the bottom (not the dropdown as before), set the 'Ground Layer' of the Player object to 'Ground'." },
    { text: "In Hierarchy, click the Main Camera. In the Inspector tab, click 'Add Component' and add the 'CameraController' script." },
    { text: "In the Unity window, drag and drop 'Player' from the Hierarchy into the 'Player' slot of the CameraController script component, where it says 'None (Transform)'. If you already did this tutorial and downloaded these files from it, it might say \"Target\" instead of \"Player\"." },
];

export default function ForwardMovementPage() {

  const pathname = usePathname();
  return (
    <main>
      <h1>Endless Runner Guided Tutorials Video Series</h1>
      <TutorialSection
        videoSrc="/Endless-Runner-Tutorials/1ForwardMovement.mp4"
        checklist={checklist}
        tutorialSeries={tutorialSeries}
        currentHref={pathname}
        storageKey={tutorialSeriesName}
      />
    </main>
  );
}

 /* {
    text: "Add this code to the PlayerController script:",
    code: `public float laneOffset = 4f; // Distance between lanes
private int currentLane = 1; // 0 = left, 1 = center, 2 = right
private int numLanes = 3;
public float laneChangeSpeed = 10f;`,
  }*/