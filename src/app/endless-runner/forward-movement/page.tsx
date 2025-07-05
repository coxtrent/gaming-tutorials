"use client"
import { usePathname } from "next/navigation";
import TutorialSection from "@/components/TutorialSection";
import { tutorialSeries, tutorialSeriesName } from "../tutorialSeries";
import type { ChecklistItem } from "@/components/TutorialSection";
import DownloadLink from "@/components/DownloadLink";
import { text } from "stream/consumers";

const checklist: ChecklistItem[] = [
  {
    text: "Create a Universal 3D project in Unity.",
  },
  {
    text: "Download the PlayerController and CameraController scripts.",
    downloads: [{ href: "/PlayerController.cs", label: "PlayerController.cs" }, { href: "/CameraController.cs", label: "CameraController.cs" }],
  },
  { text: "In your new project, in the File Explorer area (Project tab), Ctrl+Click > Create > Folder. Name it 'Scripts'." },
  {
    text: "Drag the downloaded scripts into the 'Scripts' folder.",
  },
  { text: "In the Hierarchy tab, control-click > Create > 3D Object > Pick a shape. I used a Sphere. Name it 'Player'." },
  { text: "In the Inspector tab, click 'Add Component' and add a 'Rigidbody' component. Freeze X Position, Freeze X and Z Rotation." },
    { text: "With the Player object still selected in the Hierarchy, look at the Inspector tab. Click 'Add Component' and add the 'PlayerController' script." },    { text: "In the Hierarchy section, add a ground - make it a cube. Name it 'Ground'." },
    { text: "Select the ground in the Hierarchy. Then, in the Inspector tab, create a new layer for the ground by clicking the \"Layer\" dropdown menu, clicking \"Add Layer\", and choose an unused layer. Name it 'Ground'." },    
    { text: "In the Inspector tab, set the 'Scale' of the Ground object to X=10, Y=1, Z=40." },
    { text: "With Ground still selected in the Hierarchy, in the Inspector tab, go back to the \"Layer\" dropdown menu and set the layer of the Ground object to 'Ground'." },
    { text: "Select the Player object in the Hierarchy. In the Inspector tab, near the bottom (not the dropdown as before), set the 'Ground Layer' of the Player object to 'Ground'." },

    { text: "In Hierarchy, click the Main Camera. In the Inspector tab, click 'Add Component' and add the 'CameraController' script." },
    { text: "In the Unity window, drag and drop 'Player' from the Hierarchy into the 'Player' slot of the CameraController script component, where it says 'None (Transform)'. If you already did this tutorial and downloaded these files from it, it might say \"Target\" instead of \"Player\"." },

  
  // ...more steps
  /* <li><label><input type="checkbox"> In your new project, in the File Explorer area (Project tab), Ctrl+Click &gt; Create &gt; Folder. Name it "Scripts".</label></li>
        <li><label><input type="checkbox"> Drag the downloaded scripts into the "Scripts" folder.</label></li>
        <li><label><input type="checkbox"> In the Hierarchy tab, right-click &gt; Create &gt; 3D Object &gt; Pick a shape. I used a Sphere. Name it "Player". (We can modify the texture later, but it's normal to start out game prototypes with generic models.)</label></li>
        
        <li><label><input type="checkbox"> In the Inspector tab, click "Add Component" and add a "Rigidbody" component. Freeze X Position, Freeze X and Z Rotation.</label></li>
        <li><label><input type="checkbox"> In the Hierarchy section, add a ground - make it a cube. Name it "Ground".</label></li>
        <li><label><input type="checkbox"> In the Inspector tab, set the "Scale" of the Ground object to X=10, Y=1, Z=40.</label></li>
        <li><label><input type="checkbox"> In the Inspector tab, create a new layer for the ground. Name it "Ground".</label></li>
        <li><label><input type="checkbox"> Select the Ground object in the Hierarchy. In the Inspector tab, set the "Layer" of the Ground object to "Ground".</label></li>
        <li><label><input type="checkbox"> Select the Player object in the Hierarchy. In the Inspector tab, set the "Ground Layer" of the Player object to "Ground".</label></li>
        <li><label><input type="checkbox"> In the Inspector tab, click "Add Component" and add the "PlayerController" script.</label></li>
        <li><label><input type="checkbox"> In Hierarchy, click the Main Camera. In the Inspector tab, click "Add Component" and add the "CameraController" script.</label></li>
        <li><label><input type="checkbox"> In the Unity window, drag and drop "Player" from the Hierarchy into the "Target" slot of the CameraController script component (where it says "None (Transform)").</label></li>*/ 
];

const downloadLinks = [
  {
    href: "/PlayerController.cs",
    imgSrc: "file.svg",
    alt: "Download PlayerController script",
    overlay: "Download PlayerController script",
  },
  {
    href: "/CameraController.cs",
    imgSrc: "file.svg",
    alt: "Download CameraController script",
    overlay: "Download CameraController script",
  },
];

export default function EndlessRunnerPage() {

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