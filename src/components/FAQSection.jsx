"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const FAQ_ITEMS = [
  {
    q: "Arquitectura Digital",
    a: "Branding · Web · Contingut per a xarxes. La majoria de marques tenen web. Poques tenen una identitat que es reconeix abans de llegir el nom.",
  },
  {
    q: "Posicionament Estratègic",
    a: "Patrocinis · Esdeveniments · Activacions de marca. Hi ha patrocinis que acaben en un banner. I d'altres que el públic recorda anys després.",
  },
  {
    q: "Innovació Visual",
    a: "DOOH · Producció anamòrfica · Contingut 3. Hi ha formats publicitaris que ningú mira. I d'altres que la gent para a veure i comparteix.",
  },
];

function FaqItem({ item, index, isOpen, onToggle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
    >
      <button
        onClick={onToggle}
        data-cursor="true"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(28px, 4vh, 52px) 0",
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "none",
          textAlign: "left",
          gap: 32,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(18px, 2.8vw, 36px)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            color: isOpen ? "#fff" : "rgba(255,255,255,0.7)",
            transition: "color 0.3s ease",
            flex: 1,
          }}
        >
          <span
            style={{
              marginRight: 24,
              fontSize: "clamp(12px, 1.2vw, 16px)",
              color: "rgba(255,255,255,0.3)",
              fontWeight: 300,
              letterSpacing: "0.1em",
            }}
          >
            0{index + 1}
          </span>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(36px, 3.5vw, 52px)",
            height: "clamp(36px, 3.5vw, 52px)",
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.25)",
            fontSize: "clamp(20px, 2.5vw, 30px)",
            fontWeight: 200,
            flexShrink: 0,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(15px, 1.8vw, 22px)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
                paddingBottom: "clamp(28px, 4vh, 52px)",
                paddingLeft: "clamp(28px, 4vw, 64px)",
                margin: 0,
                maxWidth: "80ch",
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section
      id="faq"
      style={{
        background: "#000",
        padding: "clamp(80px, 14vh, 160px) clamp(24px, 8vw, 130px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div ref={headerRef} style={{ marginBottom: "clamp(48px, 8vh, 96px)" }}>
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "block",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(11px, 1.2vw, 14px)",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          FAQ
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(40px, 9vw, 120px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#fff",
            margin: 0,
            lineHeight: 0.95,
          }}
        >
          Preguntes
          <br />
          <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>Freqüents</span>
        </motion.h2>
      </div>

      {/* Accordion */}
      <div style={{ maxWidth: 1100 }}>
        {FAQ_ITEMS.map((item, i) => (
          <FaqItem
            key={i}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
