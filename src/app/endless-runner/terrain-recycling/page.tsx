 "use client"
 import { usePathname } from "next/navigation";
 import TutorialSection from "@/components/TutorialSection";
 import { tutorialSeries, tutorialSeriesName } from "../tutorialSeries";
 import type { ChecklistItem } from "@/components/TutorialSection";
 
 const checklist: ChecklistItem[] = [
   {
     text: "Create a new folder in the Assets folder called \"Prefabs\".",
   },
   {
    text: "Drag and drop your Ground object from the Hierarchy into the Prefabs folder. This creates a reusable template that the scripts we're about to make will need.",
   },
   {
    text: "Create a new script in the Scripts folder called \"TerrainManager.cs\".",
   },
   {
     text: "Add this code to the top of the TerrainManager script underneath \"using UnityEngine;\"",
     code: `using System.Collections.Generic;`,
   },
   {
    text: "Add this code to the terrainManager script directly above void Start(), underneath the line with \"public class TerrainManager : MonoBehaviour\".  Make sure the number in \"public float segmentLength = 40f;\" is the same as the Z-value of the scale of the Ground object (found when you select the Ground in Hierarchy and look in the Inspector at the  Transform component.",
    code: `    public GameObject[] terrainPrefabs; // Assign in inspector
    public int poolSize = 5;
    public float segmentLength = 40f;
    public Transform player;
    private Queue<GameObject> terrainPool = new Queue<GameObject>();
    private float nextSpawnZ = 0f;`
   },
   {
    text: "Add this code to the TerrainManager script directly above void Start().",
    code: `               // Spawn initial segments
        for (int i = 0; i < poolSize; i++)
        {
            GameObject obj = Instantiate(terrainPrefabs[Random.Range(0, terrainPrefabs.Length)], 
                                         Vector3.forward * nextSpawnZ, Quaternion.identity);
            terrainPool.Enqueue(obj);
            nextSpawnZ += segmentLength;
        }`
   },
   {
    text: "Add this code to the TerrainManager script inside \"void Update()\"",
    code: `                // If the player has passed the first segment, recycle it
        GameObject firstSegment = terrainPool.Peek();
        if (player.position.z - firstSegment.transform.position.z > segmentLength)
        {
            // Move segment to the end
            firstSegment = terrainPool.Dequeue();
            firstSegment.transform.position = Vector3.forward * nextSpawnZ;
            terrainPool.Enqueue(firstSegment);
            nextSpawnZ += segmentLength;
        } `
   },
   {
    text: "In the Unity window, select the TerrainManager object in the Hierarchy. In the Inspector tab, click \"Add Component\" and add the \"TerrainManager\" script."
   },
   {
    text: "In the Inspector tab, assign the Prefabs you created earlier to the \"Terrain Prefabs\" field of the TerrainManager script.",
   },
   {
    text: "In the Inspector tab, assign the Player object to the \"Player\" field of the TerrainManager script."
   }



 ];
 
 export default function TerrainRecyclingPage() {
 
   const pathname = usePathname();
   return (
     <main>
       <h1>Endless Runner Guided Tutorials Video Series</h1>
       <TutorialSection
         videoSrc="/Endless-Runner-Tutorials/3TerrainRecycling.mp4"
         checklist={checklist}
         tutorialSeries={tutorialSeries}
         currentHref={pathname}
         storageKey={tutorialSeriesName}
       />
     </main>
   );
 }
/*
    <ol>  
        <li><label><input type="checkbox"></label></li>
        <li><label><input type="checkbox"></label></li>
<li><label><input type="checkbox"></label></li>
    <div style="position: relative;">
    <button onclick="copyCode(this)" style="position: absolute; top: 0; right: 0; z-index: 2;">Copy</button><pre><code class="language-csharp">
    </code></pre></div>
    <li><label><input type="checkbox">A</label></li>
    <div style="position: relative;">
    <button onclick="copyCode(this)" style="position: absolute; top: 0; right: 0; z-index: 2;">Copy</button><pre><code class="language-csharp">

    </code></pre></div>
    <li><label><input type="checkbox">Add this code to the TerrainManager script inside <code>void Start()</code></label></li>
    <div style="position: relative;">
    <button onclick="copyCode(this)" style="position: absolute; top: 0; right: 0; z-index: 2;">Copy</button><pre><code class="language-csharp">

    </code></pre></div>
        <li><label><input type="checkbox"></label></li>
    <div style="position: relative;">
    <button onclick="copyCode(this)" style="position: absolute; top: 0; right: 0; z-index: 2;">Copy</button><pre><code class="language-csharp">
                // If the player has passed the first segment, recycle it
        GameObject firstSegment = terrainPool.Peek();
        if (player.position.z - firstSegment.transform.position.z > segmentLength)
        {
            // Move segment to the end
            firstSegment = terrainPool.Dequeue();
            firstSegment.transform.position = Vector3.forward * nextSpawnZ;
            terrainPool.Enqueue(firstSegment);
            nextSpawnZ += segmentLength;
        } 
        </code></pre></div>
        <li><label><input type="checkbox"></label></li>
        <li><label><input type="checkbox"></label></li>
        <li><label><input type="checkbox"></label></li>
</ol>*/