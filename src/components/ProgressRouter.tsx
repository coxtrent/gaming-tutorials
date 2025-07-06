"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface GenericTutorialRouterProps {
  storageKey: string;
  tutorialSeries: { href: string }[];
}

export default function GenericTutorialRouter({ storageKey, tutorialSeries }: GenericTutorialRouterProps) {
  const router = useRouter();

  useEffect(() => {
    let lastHref = undefined;
    if (typeof window !== "undefined") {
      lastHref = localStorage.getItem(`${storageKey}LastHref`);
    }
    const targetHref =
      lastHref && tutorialSeries.some(t => t.href === lastHref)
        ? lastHref
        : tutorialSeries[0].href;
    router.replace(targetHref);
  }, [router, storageKey, tutorialSeries]);

  return (
    <div style={{ fontSize: 32, fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5em" }}>
      Loading your progress
      <span
        style={{
          display: "inline-block",
          width: "2em",
          textAlign: "left",
          animation: "ellipsis 1.2s infinite steps(4)",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        ...
      </span>
      <style>
        {`
          @keyframes ellipsis {
            to {
              width: 1.5em;
            }
          }
        `}
      </style>
    </div>
  );
}