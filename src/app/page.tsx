"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import LockedOverlay from "@/components/LockedOverlay"; // place lock overlay above tag for tutorial text

function handleGrayHover(e: React.MouseEvent<HTMLElement>, isHover: boolean) {
  const img = e.currentTarget.querySelector("img") || e.currentTarget.querySelector("span > img");
  if (img) {
    img.style.filter = isHover ? "grayscale(0%)" : "grayscale(100%)";
  }
  // For next/image, also try to target the underlying img
  const nextImg = e.currentTarget.querySelector("img");
  if (nextImg) {
    nextImg.style.filter = isHover ? "grayscale(0%)" : "grayscale(100%)";
  }
}

export const greetings: string[] = [
  "what's the good word, ${name}?",
  "top of the morning to ya, ${name}!",
  "yo ${name}, ready to roll?",
  "rise and shine, ${name}!",
  "${name} the legend",
  "hey hey, ${name}!",
  "good to see you, ${name}!",
  "big moves today, ${name}?",
  "wassup, ${name}!",
  "ready to run the world, ${name}?",
  "there you are, ${name}!",
  "let’s get it, ${name}!",
  "how’s life treating you, ${name}?",
  "look alive, ${name}!",
  "hey there, ${name}-man!",
  "the one and only—${name}!",
  "salute, ${name}!",
  "all hail the great ${name}!",
  "yo ${name}, you eat breakfast?",
  "ayy ${name}, what’s poppin’?",
  "hustlin' hard today, ${name}?",
  "let’s cook, ${name}!",
  "it’s grind time, ${name}!",
  "hope you’re feeling sharp, ${name}!",
  "the streets missed you, ${name}!",
  "woke up chosen again, huh ${name}?",
  "make room—${name} just entered the chat!",
  "ahoy, ${name}!",
  "${name} run the city",
  "check you out, ${name}!",
  "what’s good, ${name}?",
  "let’s make something cool, ${name}!",
  "suit up, ${name}!",
  "we in the lab today, ${name}?",
  "welcome back, ${name}!",
  "feelin’ like a boss, ${name}?",
  "you got this, ${name}!",
  "we believe in you, ${name}!",
  "game face on, ${name}?",
  "ooh, ${name} brought the energy today!",
  "let’s lock in, ${name}!",
  "${name} is just on that type of time bruh!",
  "brother ${name}!",
  "${name} is cooking so hard 💔😔",
  "back at it, ${name}!",
  "hey ${name}, ready to level up?",
  "let’s make history, ${name}!",
  "here comes trouble—what up, ${name}?",
  "c’mon now, ${name}, show ‘em how it’s done!",
  "alright now, ${name}, let’s do this!",
  "you were born for this, ${name}!",
  "let’s make it count, ${name}!",
  "showtime, ${name}!",
  "you movin’ like a main character, ${name}!",
  "keep your head up, ${name}!",
  "let em know, ${name}!",
  "bet big on yourself today, ${name}!",
  "ayo ${name}, teach these folks something!",
  "mr. ${name} in the building!",
  "yo ${name}, bring the heat!",
  "you came to win, huh ${name}?",
  "it’s a good day to be ${name}.",
  "don’t sleep on him—${name} is here!",
  "king energy only, ${name}!",
  "glad you showed up, ${name}!",
  "alright, alright, it’s ${name} time!",
  "keep it pushing, ${name}!",
  "light it up today, ${name}!",
  "that’s my guy—${name}!",
  "champion vibes, ${name}!",
  "respect to you, ${name}!",
  "glad to have you here, ${name}!",
  "one step at a time, ${name}.",
  "cool calm collected—yep, that’s ${name}.",
  "head high, heart steady, let’s go ${name}!",
  "mind sharp today, ${name}?",
  "power up, ${name}!",
  "flex your skills, ${name}!",
  "let’s turn up the brainpower, ${name}!",
  "the future looks like ${name}.",
  "knowledge is power—and ${name}'s got plenty.",
  "let’s build something cold, ${name}!",
  "that brain of yours is dangerous, ${name}!",
  "ayo ${name}, mind if we change the game?",
  "focus up, ${name}, we’re going places.",
  "your ideas matter, ${name}.",
  "let your work talk today, ${name}.",
  "let’s run it, ${name}!",
  "the code whisperer has entered: ${name}.",
  "your mind’s a weapon, ${name}.",
  "take your time, ${name}, but don’t waste it.",
  "you really him, ${name}.",
  "dream big, build bigger, ${name}.",
  "no shortcuts, just greatness—right ${name}?",
  "keep it real, keep it brilliant, ${name}!",
  "we’re watching a genius at work—${name}!",
  // --- hood ---
  "ayo ${name}, what’s really good?",
  "you outside today, ${name}?",
  "${name} is just built different.",
  "let’s eat, ${name}!",
  "it’s bag season, ${name}. stay focused.",
  "get that work in, ${name}.",
  "you the type they try to copy, ${name}.",
  "keep that energy, ${name}!",
  "${name} came correct.",
  "let’s get this money, ${name}?",
  "that boy ${name} stays ten toes.",
  "you've been him, ${name}, you've been him.",
  "watch him work—${name} don't miss.",
  "move like you know who you are, ${name}.",
  "head high, grind low, ${name}.",
  "whole lotta motion today, ${name}.",
  "we not regular, ${name}.",
  "show ‘em how south side code, ${name}.",
  "you got the sauce and the logic, ${name}.",
  "ain’t nobody moving smarter than ${name} today.",
  "keep it player, keep it brilliant, ${name}.",
  "they gon’ feel you today, ${name}.",
  "brains, bars, and balance—that’s ${name}.",
  "you don’t fold, you debug, ${name}.",
  "let 'em watch. ${name}'s about to go up.",
  // --- techie ---
  "system online—welcome, ${name}.",
  "hey ${name}, ready to commit some greatness?",
  "let’s compile that genius, ${name}.",
  "you running on max efficiency today, ${name}?",
  "no bugs, just brilliance—let’s go ${name}!",
  "syntax lookin’ clean, ${name}.",
  "executing excellence protocol: hello, ${name}.",
  "version 2.0 of ${name} just dropped.",
  "time to push to production, ${name}.",
  "cache cleared, code sharp—run it, ${name}!",
  "ping received—yo ${name}!",
  "welcome back to the matrix, ${name}.",
  "deploy greatness, ${name}.",
  "logic gates wide open—flow with it, ${name}.",
  "you running circles around this algorithm, ${name}.",
  "command accepted: ${name} on deck.",
  "it’s giving ai but make it black brilliance—what’s up, ${name}?",
  "variables set, path clear. go, ${name}.",
  "you're the root user of this session, ${name}.",
  "if intelligence was bandwidth, ${name} got fiber.",
  "boot sequence complete—hi, ${name}!",
  "let’s turn these functions into legacy, ${name}.",
  "code like you mean it, ${name}.",
  "innovate like your ancestors watching, ${name}.",
  // --- spiritual ---
  "peace be upon you, ${name}.",
  "walk in your light today, ${name}.",
  "you carry something divine, ${name}.",
  "the ancestors ride with you, ${name}.",
  "you were chosen to build, ${name}.",
  "every step today is sacred, ${name}.",
  "there’s purpose in your presence, ${name}.",
  "let that inner wisdom speak, ${name}.",
  "your gift is bigger than code, ${name}.",
  "you’re aligned and ascending, ${name}.",
  "you are not alone in this work, ${name}.",
  "center your breath—greatness is near, ${name}.",
  "the world shifts every time you show up, ${name}.",
  "keep walking in truth, ${name}.",
  "let clarity guide you today, ${name}.",
  "you're protected and prepared, ${name}.",
  "you came from brilliance, ${name}.",
  "your mind is sharp and your soul is steady, ${name}.",
  "you’re exactly where you’re meant to be, ${name}.",
  "let your light speak louder than your fear, ${name}.",
  "stand in your fullness today, ${name}.",
  "you are the answer someone prayed for, ${name}.",
  "your peace is powerful, ${name}.",
  "gratitude unlocks your genius, ${name}.",
  "go be a blessing, ${name}.",
  // --- teacherly ---
  "hey ${name}, your mind’s needed today.",
  "let’s do something meaningful, ${name}.",
  "time to challenge yourself, ${name}.",
  "let’s build something you’ll be proud of, ${name}.",
  "curiosity looks good on you, ${name}.",
  "let’s put those ideas into action, ${name}.",
  "no pressure, just progress—right, ${name}?",
  "learning is a form of power—use it, ${name}.",
  "mistakes are part of mastery, ${name}.",
  "today’s another shot to get sharper, ${name}.",
  "your effort matters more than you know, ${name}.",
  "let’s stay focused and finish strong, ${name}.",
  "your ideas could change everything, ${name}.",
  "even small wins are big moves, ${name}.",
  "i see leadership in you, ${name}.",
  "discipline is louder than talent, ${name}.",
  "let’s turn challenge into growth, ${name}.",
  "every step you take teaches you something, ${name}.",
  "you’re learning to lead, even now, ${name}.",
  "keep asking why, ${name}.",
  "let’s make today count, ${name}."
];


export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [inputName, setInputName] = useState("");
  const [displayedGreeting, setDisplayedGreeting] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [chosenGreeting, setChosenGreeting] = useState<string | null>(null);

useEffect(() => {
  const storedName = localStorage.getItem("genius_name");
  if (storedName) {
    setName(storedName);
  } else {
    setShowNameModal(true);
  }
}, []);

useEffect(() => {
  if (!name) return;
  // Only pick a new greeting if one hasn't been chosen yet or if the name changed
  const greeting = greetings[Math.floor(Math.random() * greetings.length)].replace(/\$\{name\}/g, name);
  setChosenGreeting(greeting);
  setDisplayedGreeting("");
}, [name]);



useEffect(() => {
  if (!name) return;
  const greeting = greetings[Math.floor(Math.random() * greetings.length)].replace(/\$\{name\}/g, name);
  setDisplayedGreeting("");
  let i = 0;
  const interval = setInterval(() => {
    setDisplayedGreeting(greeting.slice(0, i + 1));
    i++;
    if (i === greeting.length) clearInterval(interval);
  }, 30); // typing speed (ms per letter)
  return () => clearInterval(interval);
}, [name]);

useEffect(() => {
  const cursorInterval = setInterval(() => {
    setShowCursor(c => !c);
  }, 500);
  return () => clearInterval(cursorInterval);
}, []);



    // Prompt for name if not set
  /*useEffect(() => {
    if (name === null) {
      const userName = window.prompt("Welcome! What's your name?");
      if (userName && userName.trim()) {
        setName(userName.trim());
        localStorage.setItem("hgpgame_name", userName.trim());
      }
    }
  }, [name]);*/

  return (
    <section>
      <header><h1 style={{ margin: "1em 0", fontSize: "4em" }}>
  {displayedGreeting}
  {name && <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>}</h1>
        <button
  onClick={() => {
    localStorage.removeItem("genius_name");
    setName(null);
    setShowNameModal(true); // Show the modal again
    setInputName(""); // Clear the input
  }}
  style={{
    background: "#eee",
    color: "#333",
    border: "none",
    borderRadius: 6,
    padding: "0.5em 1.2em",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Change Name
</button>
      </header>
      <div
        className="nav-buttons"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}

      >
        <a
          href="/endless-runner"
          className="nav-btn"
          style={{ position: "relative", display: "inline-block" }}            
          onMouseEnter={e => handleGrayHover(e, true)}
          onMouseLeave={e => handleGrayHover(e, false)}
        >
          <Image
            src="/endless-runner.jpg"
            alt="Endless Runner"
            width={650}
            height={500}         
    
            style={{
              display: "block",
              filter: "grayscale(100%)",
              transition: "filter 0.3s ease-in-out",
              borderRadius: "16px", // Add this line
            }}

          />
          <div
        
          style={{
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
              // width: "100%",
            }}
          >
            Endless
            <br />
            Runner
          </div>
        </a>
        <a href="/for-everyone" className="nav-btn"
          onMouseEnter={e => handleGrayHover(e, true)}
          onMouseLeave={e => handleGrayHover(e, false)}
        >

          <Image
            width={600}
            height={450}
            src="/tutorials-for-everyone.jpeg"
            alt="Things Useful for Everyone"
            style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(100%)", transition: "filter 0.3s ease-in-out", borderRadius: "16px" }}
          />
        </a>
        <a
          href="/1st-person"
          className="nav-btn"
          style={{ position: "relative", display: "inline-block", transition: "filter 0.3s ease-in-out" }}
          onMouseEnter={e => handleGrayHover(e, true)}
          onMouseLeave={e => handleGrayHover(e, false)}
        >
          <Image
            src="/portal.webp"
            alt="1st Person"
            width={700}
            height={550}
            style={{
              display: "block",
              filter: "grayscale(100%)",
              borderRadius: "16px", // Add this line
            }}
          />
          <div
            style={{
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
            }}
          >
            1st
            <br />
            Person
          </div>
        </a>
        <div
          //href="/top-down-shooter" // Lock for now
          className="nav-btn"
            style={{
    position: "relative",
    display: "inline-block",
    cursor: "not-allowed",
    opacity: 0.6,
    pointerEvents: "none", // disables all mouse events
  }}
          onMouseEnter={e => handleGrayHover(e, true)}
          onMouseLeave={e => handleGrayHover(e, false)}
        >
          <Image
            src="/tds.jpg"
            alt="Top-Down Shooter"
            width={600}
            height={450}
            style={{
              display: "block",
              filter: "grayscale(100%)",
              transition: "filter 0.3s ease-in-out",
              borderRadius: "16px",
            }}
          />
            {/* Lock overlay */}
<LockedOverlay />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "yellow",
              textAlign: "center",
              fontSize: "6em",
              fontWeight: "bold",
              textShadow: "0 2px 8px #000",
              pointerEvents: "none",
              width: "100%",
            }}
          >
            Top-Down
            <br />
            Shooter
          </div>
        </div>
      </div>
      <a
        href="/3d-platformer"
        className="nav-btn"
        style={{ position: "relative", display: "inline-block" }}
        onMouseEnter={e => handleGrayHover(e, true)}
        onMouseLeave={e => handleGrayHover(e, false)}
      >
        <Image
          src="/3dplat.webp"
          alt="3D Platformer"
          width={650}
          height={500}
          style={{
            display: "block",
            filter: "grayscale(100%)",
            transition: "filter 0.3s ease-in-out",
            borderRadius: "16px",
          }}
        />
        <LockedOverlay />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "yellow",
            textAlign: "center",
            fontSize: "6em",
            fontWeight: "bold",
            textShadow: "0 2px 8px #000",
            pointerEvents: "none",
            width: "100%",
          }}
        >
          3D
          <br />
          Platformer
        </div>
      </a>
      <a
        href="/roll-a-ball"
        className="nav-btn"
        style={{ position: "relative", display: "inline-block", margin: "1em" }}
        onMouseEnter={e => handleGrayHover(e, true)}
        onMouseLeave={e => handleGrayHover(e, false)}
      >
        <Image
          src="/roll-a-ball.jpg"
          alt="Roll-a-ball Tutorials"
          width={650}
          height={500}
          style={{
            display: "block",
            filter: "grayscale(100%)",
            transition: "filter 0.3s ease-in-out",
            borderRadius: "16px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "yellow",
            textAlign: "center",
            fontSize: "6em",
            fontWeight: "bold",
            textShadow: "0 2px 8px #000",
            pointerEvents: "none",
            width: "100%",
          }}
        >
          Roll-a-ball
          <br />
        </div>
      </a>
      {/* Custom Name Reset Modal */}
      {showNameModal && (
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
        maxWidth: 600,
        textAlign: "center",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: 16 }}>
        <span style={{ fontSize: "72px" }}>Welcome, Genius.</span><br></br><br></br><span style={{ fontSize: "36px" }}>What would you like to be called?</span>
      </div>
      <input
        type="text"
        value={inputName}
        onChange={e => setInputName(e.target.value)}
        style={{
          fontSize: 36,
          padding: "0.5em 1em",
          borderRadius: 6,
          border: "1px solid #ccc",
          width: "100%",
          marginBottom: 16,
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "box-shadow 0.3s ease",
          outline: "none",
        }}
        autoFocus
        onKeyDown={e => {
          if (e.key === "Enter") {
            if (inputName.trim()) {
              setName(inputName.trim());
              localStorage.setItem("genius_name", inputName.trim());
              setShowNameModal(false);
            }
          }
        }}
      />
      <br />
      <br />
      <button
        onClick={() => {
          if (inputName.trim()) {
            setName(inputName.trim());
            localStorage.setItem("genius_name", inputName.trim());
            setShowNameModal(false);
          }
        }}
        style={{
          background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
          color: "#fff",
          textAlign: "center",
          border: "none",
          borderRadius: 6,
          padding: "0.7em 1.5em",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: 32,
          transition: "background 0.3s ease",

        }}
      >
        Continue
      </button><br></br><br></br>
      <div><span style={{ color: "red" }}>Warning:</span> Educators may see whatever you enter.</div>
    </div>
  </div>
)}
    </section>
  );
}
