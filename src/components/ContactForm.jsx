"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function FloatingInput({ label, type = "text", name, isTextarea = false }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;

  const sharedStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: focused
      ? "1.5px solid rgba(255,255,255,0.85)"
      : "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "clamp(15px, 1.6vw, 20px)",
    fontWeight: 300,
    padding: isTextarea ? "32px 0 16px" : "28px 0 12px",
    outline: "none",
    resize: "none",
    cursor: "none",
    transition: "border-color 0.3s ease",
    lineHeight: 1.6,
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <label
        style={{
          position: "absolute",
          top: active ? 8 : isTextarea ? 32 : 28,
          left: 0,
          fontSize: active ? "clamp(10px, 1vw, 12px)" : "clamp(14px, 1.5vw, 18px)",
          color: focused ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
          letterSpacing: active ? "0.2em" : "0.08em",
          textTransform: "uppercase",
          pointerEvents: "none",
          transition: "all 0.25s ease",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 300,
        }}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          rows={5}
          style={sharedStyle}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          name={name}
          type={type}
          style={sharedStyle}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
      {/* Animated underline */}
      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        style={{
          position: "absolute",
          bottom: isTextarea ? 0 : 0,
          left: 0,
          height: "1.5px",
          width: "100%",
          background: "white",
          transformOrigin: "left",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </div>
  );
}

export default function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "#000",
        padding: "clamp(80px, 14vh, 160px) clamp(24px, 8vw, 130px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ maxWidth: 900 }}>
        {/* Header */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "block",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(11px, 1.2vw, 14px)",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Contacte
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(40px, 9vw, 120px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#fff",
            margin: "0 0 clamp(48px, 8vh, 96px)",
            lineHeight: 0.95,
          }}
        >
          Tens algún projecte en ment?
          <br />
          <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>Explica&rsquo;ns-el</span>
        </motion.h2>

        {/* Form */}
        {!sent ? (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "clamp(28px, 4vh, 52px)" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(20px, 4vw, 52px)",
              }}
            >
              <FloatingInput label="Nom" name="name" />
              <FloatingInput label="Email" name="email" type="email" />
            </div>
            <FloatingInput label="Missatge" name="message" isTextarea />

            {/* Submit */}
            <div style={{ paddingTop: 8 }}>
              <motion.button
                type="submit"
                data-cursor="true"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                whileTap={{ scale: 0.97 }}
                style={{
                  position: "relative",
                  padding: "20px 60px",
                  background: "transparent",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  borderRadius: 999,
                  color: hovering ? "#000" : "#fff",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(14px, 1.5vw, 18px)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "none",
                  overflow: "hidden",
                  transition: "color 0.4s ease",
                }}
              >
                <motion.div
                  animate={{ scaleX: hovering ? 1 : 0 }}
                  initial={{ scaleX: 0 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "#fff",
                    transformOrigin: "left",
                    borderRadius: 999,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <span style={{ position: "relative", zIndex: 1 }}>Enviar missatge</span>
              </motion.button>

              <p style={{
                marginTop: 24,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(12px, 1.2vw, 15px)",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.05em",
              }}>
                O escriu-nos directament a{" "}
                <a
                  href="mailto:contact@asse7-team.com"
                  data-cursor="true"
                  style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", cursor: "none" }}
                >
                  contact@asse7-team.com
                </a>
              </p>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              padding: "clamp(40px, 6vh, 80px) 0",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            <p style={{ fontSize: "clamp(28px, 4vw, 52px)", color: "#fff", fontWeight: 500, margin: "0 0 16px" }}>
              Missatge enviat ✦
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(14px, 1.5vw, 18px)", fontWeight: 300 }}>
              Ens posarem en contacte aviat.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
