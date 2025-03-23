import { useEffect, useState } from "react";
import "./App.css";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  useEffect(() => {
    document.body.classList.toggle("no-cursor", enabled);

    return () => {
      document.body.classList.remove("no-cursor");
    }
  })

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#09f",
          borderRadius: "50%",
          opacity: "0.8",
          pointerEvents: "none",
          left: "-20px",
          top: "-20px",
          width: "50px",
          height: "50px",
          transform: `translate(${position.x}px, ${position.y}px)`,
          boxShadow: "0 0 20px 10px rgba(0, 153, 255, 0.5)",
          background:
            "radial-gradient(circle, rgba(0, 153, 255, 0.8), rgba(0, 153, 255, 0.4))",
          filter: "blur(2px)",
        }}
      ></div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Disable" : "Enable"} mouse tracking
      </button>
    </>
  );
};

function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  );
}

export default App;
