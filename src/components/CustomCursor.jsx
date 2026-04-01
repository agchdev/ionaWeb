"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorOuter = useRef(null);
  const cursorInner = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const outerPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorInner.current) {
        cursorInner.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const animate = () => {
      const lerp = (a, b, t) => a + (b - a) * t;
      outerPos.current.x = lerp(outerPos.current.x, pos.current.x, 0.12);
      outerPos.current.y = lerp(outerPos.current.y, pos.current.y, 0.12);
      if (cursorOuter.current) {
        cursorOuter.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onEnter = (e) => {
      const el = e.target.closest("a, button, [data-cursor]");
      if (el) setIsHovering(true);
    };
    const onLeave = (e) => {
      const el = e.target.closest("a, button, [data-cursor]");
      if (el) setIsHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const outerSize = isHovering ? 56 : isClicking ? 20 : 38;
  const outerOpacity = isHovering ? 0.8 : 0.35;
  const outerBorder = isHovering ? "2px solid rgba(255,255,255,0.9)" : "1.5px solid rgba(255,255,255,0.5)";
  const innerSize = isClicking ? 3 : 5;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorOuter}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: outerSize,
          height: outerSize,
          marginLeft: -(outerSize / 2),
          marginTop: -(outerSize / 2),
          border: outerBorder,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: outerOpacity,
          transition: "width 0.25s ease, height 0.25s ease, margin 0.25s ease, opacity 0.25s ease, border 0.25s ease",
          mixBlendMode: "difference",
          backdropFilter: isHovering ? "blur(2px)" : "none",
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorInner}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: innerSize,
          height: innerSize,
          marginLeft: -(innerSize / 2),
          marginTop: -(innerSize / 2),
          background: "white",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.15s ease, height 0.15s ease, margin 0.15s ease",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
