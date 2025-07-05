"use client";
import React from "react";

type DownloadLinkProps = {
  href: string;
  imgSrc: string;
  alt: string;
  overlay?: React.ReactNode;
};

export default function DownloadLink({ href, imgSrc, alt, overlay }: DownloadLinkProps) {
  return (
    <a href={href} className="nav-btn" style={{ position: "relative", display: "inline-block" }}>
      <img src={imgSrc} alt={alt} style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(100%)" }} />
      {overlay && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "yellow",
          textAlign: "center",
          fontSize: "8em",
          fontWeight: "bold",
          textShadow: "0 2px 8px #000",
          pointerEvents: "none",
          width: "100%",
        }}>
          {overlay}
        </div>
      )}
    </a>
  );
}