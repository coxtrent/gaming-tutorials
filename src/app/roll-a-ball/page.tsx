'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';




const UNITY_TUTORIAL_URL = 'https://learn.unity.com/project/roll-a-ball-tutorial';

export default function RollABallPage() {
    const [open, setOpen] = useState(true);
    const router = useRouter();

    const handleGoToUnity = () => {
        window.open(UNITY_TUTORIAL_URL, '_blank', 'noopener,noreferrer');
        setOpen(false);
    };

    const handleBackHome = () => {
        router.push('/');
    };

    const handleFinished = () => {
        // You can customize this action as needed
        router.push('/for-everyone');
    };

    if (open) {

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    background: '#fff',
                    borderRadius: 8,
                    padding: 32,
                    maxWidth: 400,
                    width: '100%',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                    textAlign: 'center',
                }}
            >
                <h2>Roll-a-ball Tutorial</h2>
                <p>
                    The Roll-a-ball tutorial is part of Unity&apos;s official website.
                    Would you like to go there now?
                </p>
                <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button
                        onClick={handleGoToUnity}
                        style={{
                            padding: '10px 20px',
                            background: '#222c37',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                        }}
                    >
                        Yes, go to unity.com
                    </button>
                    <button
                        onClick={handleBackHome}
                        style={{
                            padding: '10px 20px',
                            background: '#eee',
                            color: '#222',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                        }}
                    >
                        No, back to homepage
                    </button>
                    <button
                        onClick={handleFinished}
                        style={{
                            padding: '10px 20px',
                            background: '#4caf50',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                        }}
                    >
                        I finished Roll-a-ball and I&apos;m ready to move on
                    </button>
                </div>            
            </div>
        </div>
    );}

        // After modal closes, show a single button to go home
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <button
                onClick={handleBackHome}
                style={{
                    padding: '14px 32px',
                    background: '#222c37',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 20,
                    cursor: 'pointer',
                }}
            >
                Back to homepage
            </button>
        </div>
    );
    
    
}