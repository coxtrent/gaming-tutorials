using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerController : MonoBehaviour
{
    public float forwardSpeed = 5f;
    private Rigidbody rb;
    public float jumpForce = 5f;
    public float groundCheckRadius = 0.2f;
    public LayerMask groundLayer;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    void Update()
    {



    }
    void FixedUpdate()
    {
        float yVelocity = rb.linearVelocity.y; // preserve gravity
        float xVelocity = 0f;
        float zVelocity = forwardSpeed; // always move forward

        rb.linearVelocity = new Vector3(xVelocity, yVelocity, zVelocity);
    }

    void OnJump()
    {
        if (IsGrounded())
        {
            rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
        }
    }
    
bool IsGrounded()
{
    Collider col = GetComponent<Collider>();
    float rayLength = 0.1f; // Small fudge factor
    Vector3 origin = new Vector3(transform.position.x, col.bounds.min.y + 0.01f, transform.position.z);

    // Raycast straight down from just below the collider's lowest point
    bool grounded = Physics.Raycast(origin, Vector3.down, rayLength, groundLayer, QueryTriggerInteraction.Ignore);

    Debug.DrawRay(origin, Vector3.down * rayLength, grounded ? Color.green : Color.red, 0.1f);
    Debug.Log($"IsGrounded: {grounded} at position {origin}");
    return grounded;
}
}