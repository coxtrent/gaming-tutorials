import React from "react";

export default function LockedOverlay({
  style = {},
  children,
}: {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        fontSize: "20em",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.35)",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        pointerEvents: "none",
        zIndex: 2,
        ...style,
      }}
    >
      {children ?? "🔒"}
    </div>
  );
}