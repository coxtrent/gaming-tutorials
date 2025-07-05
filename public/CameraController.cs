using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Transform player; // Assign your player here
    public Vector3 offset = new Vector3(0, 5, -10); // Above and behind
    public float followSpeed = 5f;

    void LateUpdate()
    {
        if (player == null) return;
        Vector3 desiredPosition = player.position + offset;
        transform.position = Vector3.Lerp(transform.position, desiredPosition, followSpeed * Time.deltaTime);
        transform.LookAt(player.position + Vector3.forward * 5f); // Look slightly ahead of the player
    }
}