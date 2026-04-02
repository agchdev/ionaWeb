"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const renderPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const animate = () => {
      const lerp = (a, b, t) => a + (b - a) * t;
      renderPos.current.x = lerp(renderPos.current.x, pos.current.x, 0.2);
      renderPos.current.y = lerp(renderPos.current.y, pos.current.y, 0.2);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${renderPos.current.x}px, ${renderPos.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onWindowLeave = () => setIsVisible(false);
    const onWindowEnter = () => setIsVisible(true);

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
    window.addEventListener("blur", onWindowLeave);
    window.addEventListener("focus", onWindowEnter);
    window.addEventListener("mouseleave", onWindowLeave);
    window.addEventListener("mouseenter", onWindowEnter);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("blur", onWindowLeave);
      window.removeEventListener("focus", onWindowEnter);
      window.removeEventListener("mouseleave", onWindowLeave);
      window.removeEventListener("mouseenter", onWindowEnter);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scale = isClicking ? 0.8 : isHovering ? 1.25 : 1;
  const opacity = isVisible ? 1 : 0;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 48,
        height: 48,
        marginLeft: -24,
        marginTop: -24,
        pointerEvents: "none",
        zIndex: 99999,
        opacity,
        transform: "translate3d(-100px, -100px, 0)",
        transition: "opacity 0.2s ease, transform 0.12s ease-out",
        willChange: "transform, opacity",
        filter: "drop-shadow(0 0 12px rgba(255,255,255,0.22))",
      }}
    >
      <img
        src="/mouseIona.png"
        alt=""
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
          transform: `translateZ(0) rotate(-10deg) scale(${scale})`,
          transformOrigin: "center",
          transition: "transform 0.16s ease",
        }}
      />
    </div>
  );
}
