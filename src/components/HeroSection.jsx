"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

/* ── Particle System ─────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let raf;

    const NUM = 80;
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ── Aurora background ───────────────────────────── */
function AuroraBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
      <div className="aurora-blob aurora-3" />
    </div>
  );
}

/* ── Letter-by-letter text animation ────────────── */
function AnimatedChars({ text, delay = 0, className = "", style = {} }) {
  const chars = text.split("");
  return (
    <span className={className} style={{ display: "inline-block", ...style }}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.04, duration: 0.5, ease: "easeOut" }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Magnetic Button ─────────────────────────────── */
function MagneticButton({ children, href }) {
  const btnRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const btn = btnRef.current.getBoundingClientRect();
    const cx = btn.left + btn.width / 2;
    const cy = btn.top + btn.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.a
      ref={btnRef}
      href={href || "#contact"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      data-cursor="true"
      style={{
        display: "inline-block",
        padding: "18px 52px",
        border: "1.5px solid rgba(255,255,255,0.75)",
        borderRadius: "999px",
        color: "white",
        fontSize: "clamp(14px, 1.8vw, 18px)",
        letterSpacing: "0.12em",
        textDecoration: "none",
        fontFamily: "inherit",
        background: "transparent",
        cursor: "none",
        position: "relative",
        overflow: "hidden",
      }}
      className="cta-btn"
    >
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </motion.a>
  );
}

/* ── Glitch text ─────────────────────────────────── */
function GlitchText({ text, className, style }) {
  return (
    <span className={`glitch-wrap ${className || ""}`} style={style} data-text={text}>
      {text}
    </span>
  );
}

/* ── Hero Section ────────────────────────────────── */
export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 24px",
      }}
    >
      <AuroraBackground />
      <ParticleCanvas />

      {/* Grid overlay */}
      <div className="hero-grid" />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "clamp(24px, 4vh, 48px)",
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <h1
            style={{
              fontFamily: "'Space Grotesk', 'Helvetica Neue', sans-serif",
              fontSize: "clamp(72px, 20vw, 280px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              color: "#fff",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            ASSE7
          </h1>
        </motion.div>

        {/* Phonetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
        >
          <GlitchText
            text="[ 'as.et ]"
            style={{
              fontFamily: "'Space Grotesk', serif",
              fontStyle: "italic",
              fontSize: "clamp(28px, 5vw, 70px)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.05em",
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(13px, 1.8vw, 20px)",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.55)",
            fontWeight: 300,
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          <AnimatedChars text="Identitat · Estratègia · Presència" delay={1.7} />
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.7, ease: "easeOut" }}
          style={{ marginTop: "clamp(8px, 2vh, 24px)" }}
        >
          <MagneticButton href="#contact">Contactan&apos;s</MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 2,
        }}
      >
        <div className="scroll-line" />
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
      </motion.div>
    </section>
  );
}
