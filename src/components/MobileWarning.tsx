"use client";
// This component displays a warning for mobile users to use a desktop or rotate their device to landscape
import React, { useEffect, useState } from "react";

export default function MobileWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function check() {
      const isMobile = window.innerWidth <= 800;
      const isPortrait = window.innerHeight > window.innerWidth;
      setShow(isMobile && isPortrait);
    }
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      zIndex: 9999,
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.85)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontSize: "1.5em",
      textAlign: "center",
      padding: "2em"
    }}>
      <div>
        <strong>For the best experience,<br />please use a desktop or rotate your device to landscape mode.</strong>
      </div>
    </div>
  );
}