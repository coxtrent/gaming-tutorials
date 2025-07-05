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
    public float laneChangeSpeed = 10f;</code></pre></div>`
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
/*    <h2 id="recycling">Intro to Terrain Recycling</h2>
    <p>Now we will make it so the world is ACTUALLY endless.</p>
    <video controls width="640" style="display:block; margin: 2em 0;">
        <source src="Endless-Runner-Tutorials/3TerrainRecycling.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <ol>
        <li><label><input type="checkbox">Create a new folder in the Assets folder called "Prefabs".</label></li>
        <li><label><input type="checkbox">Drag and drop your Ground object from the Hierarchy into the Prefabs folder. This creates a reusable template that the scripts we're about to make will need.</label></li>
<li><label><input type="checkbox">Create a new script in the Scripts folder called "TerrainManager.cs".</label></li>
    <div style="position: relative;">
    <button onclick="copyCode(this)" style="position: absolute; top: 0; right: 0; z-index: 2;">Copy</button><pre><code class="language-csharp">
    using System.Collections.Generic;</code></pre></div>
    <li><label><input type="checkbox">Add this code to the TerrainManager script directly above <code>void Start()</code>. Make sure the number in <code>public float segmentLength = 40f;</code> is the same as the Z scale of the Ground object (and make sure it has the 'f' at the end).</label></li>
    <div style="position: relative;">
    <button onclick="copyCode(this)" style="position: absolute; top: 0; right: 0; z-index: 2;">Copy</button><pre><code class="language-csharp">
    public GameObject[] terrainPrefabs; // Assign in inspector
    public int poolSize = 5;
    public float segmentLength = 40f;
    public Transform player;

    private Queue<GameObject> terrainPool = new Queue<GameObject>();
    private float nextSpawnZ = 0f;
    </code></pre></div>
    <li><label><input type="checkbox">Add this code to the TerrainManager script inside <code>void Start()</code></label></li>
    <div style="position: relative;">
    <button onclick="copyCode(this)" style="position: absolute; top: 0; right: 0; z-index: 2;">Copy</button><pre><code class="language-csharp">
               // Spawn initial segments
        for (int i = 0; i < poolSize; i++)
        {
            GameObject obj = Instantiate(terrainPrefabs[Random.Range(0, terrainPrefabs.Length)], 
                                         Vector3.forward * nextSpawnZ, Quaternion.identity);
            terrainPool.Enqueue(obj);
            nextSpawnZ += segmentLength;
        }
    </code></pre></div>
        <li><label><input type="checkbox">Add this code to the TerrainManager script inside <code>void Update()</code></label></li>
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
        <li><label><input type="checkbox">In the Unity window, select the TerrainManager object in the Hierarchy. In the Inspector tab, click "Add Component" and add the "TerrainManager" script.</label></li>
        <li><label><input type="checkbox">In the Inspector tab, assign the Prefabs you created earlier to the "Terrain Prefabs" field of the TerrainManager script.</label></li>
        <li><label><input type="checkbox">In the Inspector tab, assign the Player object to the "Player" field of the TerrainManager script.</label></li>
</ol>*/