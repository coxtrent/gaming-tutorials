"use client";
import React, { useEffect, useState } from "react";
import * as Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-csharp"; // Import C# syntax highlighting
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type TutorialSeriesItem = {
  label: string;
  href: string;
}

export type ChecklistItem = {
  text: string;
  code?: string; // Optional code block for this step
  downloads?: { href: string; label: string;  }[]; // Optional links for this step
  links?: { href: string; label: string; }[]; // Optional links for this step
};

export type TutorialSectionProps = {
  videoSrc: string;
  checklist: ChecklistItem[];
  tutorialSeries: TutorialSeriesItem[];
  currentHref: string; // Pass the current page's href to highlight it
  storageKey: string; // Key for localStorage to save checklist state
};

export default function TutorialSection({ videoSrc, checklist, tutorialSeries, currentHref, storageKey }: TutorialSectionProps) {
   // Track checked state for each item
  const [checked, setChecked] = useState<boolean[]>(() => checklist.map(() => false));
  const [showResetConfirm, setShowResetConfirm] = useState(false); 
  const [completedTutorials, setCompletedTutorials] = useState<string[]>(() => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("completedTutorials") || "[]");
  }
  return [];
});

// Generic save function
function saveProgress(storageKey: string, currentHref: string, checked: boolean[]) {
  localStorage.setItem(
    `${storageKey}:Steps:${currentHref}`,
    JSON.stringify(checked)
  );
}
  // Render prism.js syntax highlighting
    useEffect(() => {
    Prism.highlightAll();
  }, [checklist]);  
  // All done if every item is checked
  const allDone = checked.every(Boolean);

  

  useEffect(() => {
    // On component mount, load saved checklist state from localStorage
    const saved = localStorage.getItem(`${storageKey}:Steps:${currentHref}`);
    if (saved) {
      setChecked(JSON.parse(saved));
    }
  }, [storageKey, currentHref]);

useEffect(() => {
  if (allDone) {
    setCompletedTutorials(prev => {
      if (!prev.includes(currentHref)) {
        const updated = [...prev, currentHref];
        localStorage.setItem("completedTutorials", JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  }
}, [allDone, currentHref]);
  
  useEffect(() => {
  if (allDone) {
    // Get current completed list
    const completed = JSON.parse(localStorage.getItem("completedTutorials") || "[]");
    if (!completed.includes(currentHref)) {
      completed.push(currentHref);
      localStorage.setItem("completedTutorials", JSON.stringify(completed));
    }
  }
}, [allDone, currentHref]);

  // Handler for individual checkboxes
  const handleCheck = (idx: number) => {
    setChecked(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
    // Save checked state for a tutorial page
    saveProgress(storageKey, currentHref, next);
      return next;
    });

  };



  // Handler for the final checkbox
   const handleAllDoneCheck = () => {
    if (allDone) {
      setShowResetConfirm(true); // Show custom popup
    } else {
      setChecked(Array(checklist.length).fill(true));
      saveProgress(storageKey, currentHref, Array(checklist.length).fill(true));
    }
  };

  const handleConfirmReset = () => {
    setChecked(Array(checklist.length).fill(false));
    saveProgress(storageKey, currentHref, Array(checklist.length).fill(false));
    setShowResetConfirm(false);
  };

  const handleCancelReset = () => {
    setShowResetConfirm(false);
  };

  // Copy code handler
  const handleCopy = (code: string, e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(code);
    const btn = e.currentTarget;
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = "Copy"), 1200);
  };

  const router = useRouter();

  const nextIt = () => {
    const currentIdx = tutorialSeries.findIndex(item => item.href === currentHref);
    const next = tutorialSeries[currentIdx + 1];
    return next;
  }

  const handleNext = () => {
  const next = nextIt();
  if (next) {
    router.push(next.href);
    if (typeof window !== "undefined") {
      localStorage.setItem(`${storageKey}LastHref`, next.href);
    }
  } else {
    // If this is the last page, go to for-everyone page
    router.push("/for-everyone");
  }
};

  return (
    <section style={{ 
      display: "flex",
      alignItems: "flex-start",
      width: "100%", }}>
        <div style={{
          flex: 1,
          maxWidth: "100%",
        }}>
      <video controls width="100%" style={{ display: "block", margin: "2em 0" }}>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <ol style={{ margin: "2em 0", paddingRight: "4em"}}>
        {checklist.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "1.5em", fontStyle: "bold" }}><input 
          type="checkbox" 
          id={`step-${idx}`}
          checked={checked[idx] || false}
          onChange={() => handleCheck(idx)}
           />
            <label htmlFor={`step-${idx}`} style={{ marginLeft: "0.5em" }}>
              <span style={{ fontWeight: "bold" }}>Step {idx + 1}:</span> {item.text}
            </label>
            {item.downloads && (
                <div style={{ marginTop: "0.5em", display: "flex", flexWrap: "wrap", gap: "0.5em" }}>
                {item.downloads.map((dl, i) => (
                  <a
                    key={i}
                    href={dl.href}
                    download
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "1em",
                      padding: "0.3em 0.7em",
                      background: "#e0e7ff",
                      borderRadius: "4px",
                      color: "#3730a3",
                      textDecoration: "none",
                      fontWeight: "bold",
                      transition: "background 0.2s, color 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "#c7d2fe";
                      e.currentTarget.style.color = "#1e40af";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "#e0e7ff";
                      e.currentTarget.style.color = "#3730a3";
                    }}
                    onMouseDown={e => {
                      e.currentTarget.style.background = "#facc15";
                      e.currentTarget.style.color = "#222";
                    }}
                    onMouseUp={e => {
                      e.currentTarget.style.background = "#c7d2fe";
                      e.currentTarget.style.color = "#1e40af";
                    }}
                  >{
                    <Image
                      src="/file.svg"
                      alt={dl.label}
                      width={20}
                      height={20}
                      style={{ verticalAlign: "middle", marginRight: "0.5em" }}
                    />
                  }{dl.label}
                  </a>
                ))}
              </div>
            )}
            {item.code && (
              <div style={{ position: "relative", marginTop: "0.5em" }}>
                <button
                  onClick={e => handleCopy(item.code!, e)}
                  style={{
                    position: "relative",
                    top: 0,
                    right: 0,
                  }}
                >
                  Copy
                </button>
                <pre className="language-csharp" style={{ backgroundColor: "#f5f5f5", padding: "1em", borderRadius: "4px", width: "700px"}}>
                  <code>{item.code}</code>
                </pre>
              </div>
            )}
          </li>
        ))}
      </ol>
  
  </div>
        <aside
        style={{
        width: 260,
        marginLeft: "2em",
        background: "#f3f4f6",
        borderRadius: 12,
        boxShadow: "0 2px 12px #0001",
        padding: "2em 1em",
        minHeight: 400,
        position: "sticky",
        top: 32,
        alignSelf: "flex-start",
        height: "fit-content",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 16, fontSize: 18 }}>
          Video Tutorials
        </div>
<nav>
  {tutorialSeries.map((item, idx) => {
    // Only unlock the current and previous tutorials, and the next one if allDone
    let isUnlocked = completedTutorials.includes(item.href) || idx === 0;
    if (completedTutorials.includes(tutorialSeries[idx - 1]?.href)) isUnlocked = true;
    if (currentHref === item.href) isUnlocked = true;
    const isCurrent = currentHref === item.href;

    if (isUnlocked) {
      return (
        <Link
          key={item.href}
          href={item.href}
          style={{
            display: "block",
            padding: "0.7em 1em",
            margin: "0.2em 0",
            borderRadius: 6,
            background: isCurrent ? "#d1fae5" : "transparent",
            color: isCurrent ? "#065f46" : "#222",
            fontWeight: isCurrent ? "bold" : "normal",
            textDecoration: "none",
            transition: "background 0.2s, color 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={e => {
            if (!isCurrent) {
              e.currentTarget.style.background = "#e0e7ef";
              e.currentTarget.style.color = "#065f46";
            }
          }}
          onMouseLeave={e => {
            if (!isCurrent) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#222";
            }
          }}
        >
          {item.label}
        </Link>
      );
    } else {
      return (
        <div
          key={item.href}
          style={{
            display: "block",
            padding: "0.7em 1em",
            margin: "0.2em 0",
            borderRadius: 6,
            background: "#f3f4f6",
            color: "#bbb",
            fontWeight: "normal",
            textDecoration: "none",
            cursor: "not-allowed",
            opacity: 0.6,
            userSelect: "none",
            position: "relative",
          }}
        >
          <span style={{ marginRight: 8, fontSize: 18, verticalAlign: "middle" }}>🔒</span>
          {item.label}
        </div>
      );
    }
  })}
            <div
            style={{
              margin: "0.5em 0",
              padding: "0.7em 1em",
              borderRadius: 6,
              background: "#f9fafb",
              color: "#888",
              fontStyle: "italic",
              transition: "background 0.2s",
              cursor: "default",
            }}
            >
            More soon...
            </div>
        </nav>
        <div style={{ marginTop: "2em", fontWeight: "bold" }}>
          <Link href="/" style={{ textDecoration: "none", color: "rgb(6, 51, 95)"  }}>
            Go Back Home
          </Link>
        </div>
        <div style={{ marginTop: "1.5em" }}>

      <div style={{ height: "1em" }} />
      <button

        className={`next-btn${allDone ? " enabled" : ""}`}
    disabled={!allDone}
    onClick={handleNext}
  ><style>
      {`
        .next-btn {
          font-size: 28px;
          font-family: 'Lexend Deca', sans-serif;
          background: linear-gradient(90deg, rgb(254, 254, 254) 0%, rgb(217, 217, 217) 100%);
          color: #222;
          padding: 1em 2em;
          border-radius: 8px;
          border: none;
          font-weight: bold;
          transition: opacity 0.3s, background 0.3s;
          cursor: not-allowed;
          opacity: 0.5;
        }
        .next-btn.enabled {
          background: linear-gradient(90deg, rgb(102, 246, 126) 0%, rgb(102, 224, 246) 100%);
          cursor: pointer;
          opacity: 1;
        }
        .next-btn.enabled:hover, .next-btn.enabled:focus {
          background: linear-gradient(90deg, rgb(126, 246, 102) 0%, rgb(251, 214, 214) 100%);
        }
      `}
    </style>
      Next
    </button>      <div style={{ fontSize: 28, 
        fontFamily: "Lexend Deca",
          background: allDone
          ? "linear-gradient(90deg,rgb(126, 246, 102) 0%,rgb(251, 214, 214) 100%)"
          : "linear-gradient(90deg,rgb(255, 255, 255) 0%,rgb(251, 214, 214) 100%)",
          padding: "1em",
          borderRadius: "8px",
          display: "inline-block",
          marginTop: "1em" }}>
       <input 
       id="all-done-checkbox"
       type="checkbox" 
       style={{ accentColor: "orange" }}   
       checked={allDone}
       onChange={handleAllDoneCheck} ></input>  {allDone
    ? "Reset Page"
    : "Skip Page"}
      </div>  </div>
      </aside>
            {/* Custom Reset Confirmation Modal */}
      {showResetConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "2em 2.5em",
              boxShadow: "0 4px 32px #0003",
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
              Reset Progress?
            </div>
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: 24,
                }}
              >
                WARNING: This will uncheck all steps on this page.
              </div>
              <br></br>Are you sure you want to reset your progress? 
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "1em" }}>
              <button
                onClick={handleConfirmReset}
                style={{
                  background: "linear-gradient(90deg, #f87171 0%, #fbbf24 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "0.7em 1.5em",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                Yes, Reset
              </button>
              <button
                onClick={handleCancelReset}
                style={{
                  background: "#e5e7eb",
                  color: "#222",
                  border: "none",
                  borderRadius: 6,
                  padding: "0.7em 1.5em",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}