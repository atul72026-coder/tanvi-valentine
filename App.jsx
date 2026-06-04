import React, { useState, useEffect, useRef } from "react";

// ✏️ EDITABLE VARIABLES
const recipientName = "Motichoor";
const senderName = "Haddi";

// ---- Floating Hearts Background ----
function FloatingHearts({ count = 12 }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 4,
    size: 10 + Math.random() * 18,
    emoji: ["💕", "💗", "💖", "🌸", "✨", "💓"][Math.floor(Math.random() * 6)],
  }));
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            left: `${h.left}%`,
            bottom: "-40px",
            fontSize: `${h.size}px`,
            animation: `floatUp ${h.duration}s ${h.delay}s infinite ease-in`,
            opacity: 0.7,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

// ---- Confetti ----
function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
    color: ["#ff6eb4", "#ff9de2", "#ffc0cb", "#ffb347", "#b0e0e6", "#dda0dd", "#98fb98"][Math.floor(Math.random() * 7)],
    size: 6 + Math.random() * 8,
    rotate: Math.random() * 360,
  }));
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-20px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confettiFall ${p.duration}s ${p.delay}s infinite ease-in`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// ---- Screen 1: Envelope Welcome ----
function Screen1({ onNext }) {
  const [opening, setOpening] = useState(false);
  const handleOpen = () => {
    setOpening(true);
    setTimeout(onNext, 900);
  };
  return (
    <div className="screen" style={{ background: "linear-gradient(160deg, #ffe6f0 0%, #ffd6e8 40%, #ffc2da 100%)" }}>
      <FloatingHearts count={10} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
        <div
          style={{
            fontSize: "90px",
            animation: opening ? "envelopeOpen 0.8s ease forwards" : "envelopeBob 2.5s ease-in-out infinite",
            filter: "drop-shadow(0 8px 24px rgba(255,100,160,0.3))",
            transformOrigin: "center bottom",
          }}
        >
          💌
        </div>
        <div style={{ animation: "fadeSlideUp 0.8s 0.2s both" }}>
          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(26px, 8vw, 36px)",
            fontWeight: "700",
            color: "#4a1a2c",
            lineHeight: 1.3,
            marginBottom: "6px",
          }}>
            Someone made this<br />
            <span style={{ color: "#e05585", fontStyle: "italic" }}>just for you</span>
          </h1>
          <p style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            color: "#e05585",
            fontSize: "16px",
            margin: "10px 0 4px",
          }}>
            {senderName} made this just for you 💕
          </p>
          <p style={{ color: "#9a5568", fontSize: "13px", letterSpacing: "0.02em", lineHeight: 1.5 }}>
            (yes, the same Haddi who fell asleep 😴)<br/>
            <span style={{ fontSize: "12px", color: "#b06080" }}>Tap to unwrap his sorry + something sweet...</span>
          </p>
        </div>
        <button
          onClick={handleOpen}
          style={{
            background: "linear-gradient(135deg, #e05585, #c4336a)",
            color: "white",
            border: "none",
            borderRadius: "50px",
            padding: "16px 52px",
            fontSize: "20px",
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(224,85,133,0.4)",
            transform: opening ? "scale(0.95)" : "scale(1)",
            transition: "all 0.2s",
            animation: "fadeSlideUp 0.8s 0.5s both",
          }}
        >
          Open
        </button>
      </div>
    </div>
  );
}

// ---- Screen 2: Cuteness Scanner ----
function Screen2({ onNext }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const labels = ["SCANNING SMILE...", "DETECTING CHARM...", "MEASURING BEAUTY...", "CALCULATING HEART-MELTING ABILITY..."];
  const [label, setLabel] = useState(labels[0]);

  useEffect(() => {
    let cur = 0;
    const interval = setInterval(() => {
      cur += Math.floor(Math.random() * 4) + 2;
      if (cur >= 100) {
        cur = 100;
        clearInterval(interval);
        setTimeout(() => setDone(true), 400);
      }
      setPct(cur);
      setLabel(labels[Math.floor((cur / 100) * (labels.length - 1))]);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="screen" style={{ background: "linear-gradient(160deg, #2d0a1a 0%, #4a0f2a 50%, #1a0510 100%)" }}>
      <FloatingHearts count={6} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
        <h2 style={{
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(22px, 7vw, 32px)",
          color: "white",
          fontStyle: "italic",
          lineHeight: 1.4,
        }}>
          Measuring your<br />
          <span style={{ color: "#ff7eb3" }}>cuteness...</span>
        </h2>

        {/* Glow orb */}
        <div style={{
          position: "relative",
          width: "160px",
          height: "160px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,100,160,0.2) 0%, transparent 70%)",
            animation: "pulse 2s ease-in-out infinite",
          }} />
          <p style={{
            fontFamily: "'Georgia', serif",
            fontSize: done ? "56px" : "64px",
            fontWeight: "700",
            color: "#ff7eb3",
            transition: "all 0.3s",
            textShadow: "0 0 30px rgba(255,100,160,0.6)",
          }}>
            {done ? "∞" : `${pct}%`}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ width: "85%", maxWidth: "320px" }}>
          <div style={{
            height: "6px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "99px",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${pct}%`,
              background: done
                ? "linear-gradient(90deg, #ffd700, #ffaa00)"
                : "linear-gradient(90deg, #ff6eb4, #ff3d85)",
              borderRadius: "99px",
              transition: "width 0.1s ease, background 0.5s",
              boxShadow: done ? "0 0 12px rgba(255,215,0,0.7)" : "0 0 10px rgba(255,80,140,0.6)",
            }} />
          </div>
          {!done && <p style={{ color: "rgba(255,150,180,0.7)", fontSize: "11px", letterSpacing: "0.12em", marginTop: "8px" }}>{label}</p>}
        </div>

        {done && (
          <div style={{ animation: "fadeSlideUp 0.6s both" }}>
            <div style={{ fontSize: "40px", marginBottom: "6px" }}>💖✨</div>
            <p style={{ color: "#ffd700", fontWeight: "700", letterSpacing: "0.1em", fontSize: "16px" }}>CUTENESS OVERLOAD</p>
            <p style={{ color: "rgba(255,200,220,0.8)", fontSize: "14px", marginTop: "4px" }}>Nobody should be this adorable.</p>
            <button
              onClick={onNext}
              style={{
                marginTop: "24px",
                background: "linear-gradient(135deg, #e05585, #c4336a)",
                color: "white",
                border: "none",
                borderRadius: "50px",
                padding: "14px 36px",
                fontSize: "17px",
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                cursor: "pointer",
                boxShadow: "0 6px 24px rgba(224,85,133,0.5)",
              }}
            >
              🌸 Reveal What's Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Balloon Screen ----
const BALLOONS = [
  { color: "#ff6eb4", shadow: "rgba(255,110,180,0.5)", emoji: "😴", msg: "Ok fine, I slept. But even in my dreams I was thinking of you 🥺" },
  { color: "#a855f7", shadow: "rgba(168,85,247,0.5)", emoji: "🙈", msg: "You are my favourite person in the whole world... please don't stay mad 🌎💔" },
  { color: "#f97316", shadow: "rgba(249,115,22,0.5)", emoji: "🐣", msg: "I promise next time I'll set 10 alarms before sleeping 😂 I'm sorry Motichoor!" },
  { color: "#38bdf8", shadow: "rgba(56,189,248,0.5)", emoji: "💫", msg: "You waited for me and I feel so bad. You deserve better than a sleepy Haddi 😭" },
  { color: "#4ade80", shadow: "rgba(74,222,128,0.5)", emoji: "🌸", msg: "I am grateful for you every single day — especially today when you didn't block me 😅🌸" },
];

function BalloonCard({ balloon, onClose }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(60,10,30,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      backdropFilter: "blur(6px)",
      animation: "fadeIn 0.3s both",
    }}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        padding: "12px",
        maxWidth: "280px",
        width: "85%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        animation: "popCard 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
        position: "relative",
      }}>
        {/* Tape */}
        <div style={{
          position: "absolute",
          top: "-14px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "50px",
          height: "22px",
          background: "rgba(210,180,140,0.7)",
          borderRadius: "3px",
        }} />
        <div style={{
          background: "#f5f0f0",
          borderRadius: "10px",
          overflow: "hidden",
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "80px",
          marginBottom: "8px",
        }}>
          {balloon.emoji}
        </div>
        <p style={{
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
          textAlign: "center",
          color: "#4a1a2c",
          fontSize: "14px",
          lineHeight: 1.5,
          margin: "8px 4px 4px",
        }}>{balloon.msg}</p>
        <p style={{ textAlign: "center", color: "#aaa", fontSize: "11px", letterSpacing: "0.1em" }}>WITH LOVE</p>
        <button
          onClick={onClose}
          style={{
            display: "block",
            margin: "14px auto 4px",
            background: "linear-gradient(135deg, #e05585, #c4336a)",
            color: "white",
            border: "none",
            borderRadius: "40px",
            padding: "10px 30px",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "0.08em",
            cursor: "pointer",
          }}
        >
          POP ANOTHER BALLOON
        </button>
      </div>
    </div>
  );
}

function Screen3({ onNext }) {
  const [popped, setPopped] = useState([]);
  const [active, setActive] = useState(null);
  const [allDone, setAllDone] = useState(false);

  const handlePop = (i) => {
    if (popped.includes(i)) return;
    setActive(i);
  };

  const handleClose = () => {
    const newPopped = [...popped, active];
    setPopped(newPopped);
    setActive(null);
    if (newPopped.length === BALLOONS.length) {
      setTimeout(() => setAllDone(true), 400);
    }
  };

  return (
    <div className="screen" style={{ background: "linear-gradient(160deg, #f0e6ff 0%, #e8d5f5 40%, #dcc8f0 100%)" }}>
      {active !== null && <BalloonCard balloon={BALLOONS[active]} onClose={handleClose} />}

      {allDone ? (
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center" style={{ animation: "fadeSlideUp 0.6s both" }}>
          <div style={{
            background: "white",
            borderRadius: "24px",
            padding: "36px 28px",
            boxShadow: "0 16px 48px rgba(200,100,160,0.2)",
            maxWidth: "320px",
            width: "100%",
          }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>💖✨</div>
            <h2 style={{
              fontFamily: "'Georgia', serif",
              fontSize: "28px",
              fontStyle: "italic",
              color: "#4a1a2c",
              marginBottom: "12px",
            }}>You popped them all.</h2>
            <p style={{ color: "#7a4560", fontSize: "15px", lineHeight: 1.6 }}>
              Every balloon carried a little reason why you're special. Now it's time for the biggest one.
            </p>
            <p style={{ fontSize: "22px", margin: "16px 0" }}>✨🌸💕🌸✨</p>
            <button
              onClick={onNext}
              style={{
                background: "linear-gradient(135deg, #e05585, #c4336a)",
                color: "white",
                border: "none",
                borderRadius: "50px",
                padding: "16px 32px",
                fontSize: "18px",
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                cursor: "pointer",
                boxShadow: "0 6px 24px rgba(224,85,133,0.4)",
                width: "100%",
              }}
            >
              💌 Open Your Letter
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col h-full">
          <div style={{ textAlign: "center", padding: "48px 24px 12px" }}>
            <h2 style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(22px, 7vw, 30px)",
              color: "#3a1530",
              fontWeight: "700",
            }}>Pop the balloons</h2>
            <div style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.7)",
              borderRadius: "40px",
              padding: "6px 20px",
              fontSize: "14px",
              color: "#7a4560",
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
              marginTop: "6px",
              backdropFilter: "blur(6px)",
            }}>Each one holds a little secret</div>
          </div>

          <div style={{ flex: 1, position: "relative" }}>
            {BALLOONS.map((b, i) => {
              const positions = [
                { top: "5%", left: "12%" },
                { top: "3%", left: "58%" },
                { top: "28%", left: "34%" },
                { top: "28%", left: "64%" },
                { top: "52%", left: "18%" },
              ];
              const pos = positions[i];
              const isPopped = popped.includes(i);
              return (
                <div
                  key={i}
                  onClick={() => !isPopped && handlePop(i)}
                  style={{
                    position: "absolute",
                    ...pos,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: isPopped ? "default" : "pointer",
                    animation: `balloonFloat ${2.5 + i * 0.4}s ease-in-out infinite`,
                    opacity: isPopped ? 0 : 1,
                    transition: "opacity 0.3s",
                    userSelect: "none",
                  }}
                >
                  <div style={{
                    width: "72px",
                    height: "85px",
                    background: `radial-gradient(circle at 35% 30%, white 0%, ${b.color} 40%, ${b.color}cc 100%)`,
                    borderRadius: "50% 50% 50% 50% / 55% 55% 45% 45%",
                    boxShadow: `0 8px 24px ${b.shadow}`,
                    position: "relative",
                    transition: "transform 0.1s",
                  }}>
                    <div style={{
                      position: "absolute",
                      bottom: "-14px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "0",
                      height: "0",
                      borderLeft: "4px solid transparent",
                      borderRight: "4px solid transparent",
                      borderTop: `14px solid ${b.color}`,
                    }} />
                  </div>
                  <div style={{ width: "1px", height: "40px", background: "rgba(100,60,80,0.3)" }} />
                </div>
              );
            })}
          </div>

          <div style={{ padding: "12px 0 24px" }} />
        </div>
      )}
    </div>
  );
}

// ---- Screen 4 (Letter) ----
function Screen4({ onNext }) {
  const [typed, setTyped] = useState("");
  const fullText = `Ok first of all... I'm sorry. 😔\n\nI know you were waiting for me and I just... fell asleep like a log. Classic Haddi move, I know.\n\nBut here's the truth — you are so loved and cherished. Every moment with you is a treasure I hold close to my heart.\n\nPlease forgive this sleepy, hopeless boy who loves you way too much. 🥺`;
  const ref = useRef(0);

  useEffect(() => {
    ref.current = 0;
    const t = setInterval(() => {
      ref.current++;
      if (ref.current > fullText.length) { clearInterval(t); return; }
      setTyped(fullText.slice(0, ref.current));
    }, 28);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="screen" style={{ background: "linear-gradient(160deg, #ffe6f0 0%, #ffd6e8 50%, #ffc2da 100%)" }}>
      <FloatingHearts count={8} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "28px 24px 24px",
          maxWidth: "340px",
          width: "100%",
          boxShadow: "0 20px 60px rgba(200,80,140,0.18)",
          position: "relative",
          animation: "fadeSlideUp 0.6s both",
        }}>
          {/* Pin */}
          <div style={{
            position: "absolute",
            top: "-14px",
            right: "18px",
            fontSize: "28px",
          }}>📌</div>

          <h3 style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            fontSize: "22px",
            color: "#e05585",
            marginBottom: "14px",
          }}>Dear {recipientName},</h3>

          <p style={{
            fontFamily: "'Georgia', serif",
            fontSize: "15px",
            color: "#4a1a2c",
            lineHeight: 1.8,
            minHeight: "120px",
            whiteSpace: "pre-line",
          }}>{typed}<span style={{ animation: "blink 1s infinite", color: "#e05585" }}>|</span></p>

          <div style={{ height: "1px", background: "rgba(224,85,133,0.2)", margin: "16px 0" }} />

          <p style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            fontSize: "18px",
            color: "#e05585",
          }}>With all my love, {senderName} ✨</p>
        </div>

        {typed.length >= fullText.length && (
          <button
            onClick={onNext}
            style={{
              marginTop: "24px",
              background: "linear-gradient(135deg, #e05585, #c4336a)",
              color: "white",
              border: "none",
              borderRadius: "50px",
              padding: "16px 40px",
              fontSize: "18px",
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
              cursor: "pointer",
              boxShadow: "0 6px 24px rgba(224,85,133,0.4)",
              animation: "fadeSlideUp 0.5s both",
            }}
          >
            One Last Surprise
          </button>
        )}
      </div>
    </div>
  );
}

// ---- Screen 5: Final Celebration ----
function Screen5() {
  return (
    <div className="screen" style={{ background: "linear-gradient(160deg, #ffe6f0 0%, #ffd6e8 50%, #ffc2da 100%)" }}>
      <Confetti />
      <FloatingHearts count={14} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center gap-6">
        {/* Illustration */}
        <div style={{
          background: "white",
          borderRadius: "24px",
          padding: "24px",
          boxShadow: "0 16px 48px rgba(200,80,140,0.25)",
          animation: "popCard 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
          maxWidth: "280px",
          width: "100%",
        }}>
          <div style={{ fontSize: "90px", lineHeight: 1 }}>🫂</div>
          <div style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            fontSize: "15px",
            color: "#4a1a2c",
            lineHeight: 1.7,
            margin: "14px 0 8px",
          }}>
            "You are so loved and cherished.<br />
            Every moment with you is a treasure...<br />
            <span style={{ fontSize: "13px", color: "#888" }}>(even the ones where Haddi is snoring 😴)</span>"
          </div>
          <p style={{ color: "#e05585", fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: "16px" }}>
            — {senderName}
          </p>
        </div>

        <div style={{
          animation: "fadeSlideUp 0.6s 0.4s both",
        }}>
          <div style={{ fontSize: "28px", letterSpacing: "4px" }}>💕✨💕</div>
          <p style={{
            color: "#7a2040",
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            fontSize: "18px",
            marginTop: "10px",
          }}>Your sleepy but very much in love,<br />{senderName} 😴💕</p>
        </div>
      </div>
    </div>
  );
}



// ---- Main App ----
export default function App() {
  const [screen, setScreen] = useState(0);

  const screens = [
    <Screen1 key={0} onNext={() => setScreen(1)} />,
    <Screen2 key={1} onNext={() => setScreen(2)} />,
    <Screen3 key={2} onNext={() => setScreen(3)} />,
    <Screen4 key={3} onNext={() => setScreen(4)} />,
    <Screen5 key={4} />,
  ];

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #1a0510; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .screen {
          width: 100%;
          max-width: 430px;
          height: 100vh;
          max-height: 932px;
          position: relative;
          overflow: hidden;
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          100% { transform: translateY(-110vh) scale(0.6); opacity: 0; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes envelopeBob {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes envelopeOpen {
          0% { transform: scale(1) rotate(0); }
          40% { transform: scale(1.2) rotate(-5deg); }
          100% { transform: scale(0) rotate(10deg); opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popCard {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes balloonFloat {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-16px) rotate(3deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative" }}>
          <div
            key={screen}
            style={{ animation: "fadeIn 0.5s both" }}
          >
            {screens[screen]}
          </div>
          {/* Dot navigation */}
          <div style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            zIndex: 200,
          }}>
            {screens.map((_, i) => (
              <div key={i} style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: i === screen ? "#e05585" : "rgba(224,85,133,0.3)",
                transition: "all 0.3s",
              }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
