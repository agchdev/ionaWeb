"use client";
import { Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";

const quoteFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function StatementSection() {
  return (
    <section
      style={{
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "clamp(80px, 16vh, 180px) clamp(24px, 8vw, 130px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        className={quoteFont.className}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#f2f2f2",
            fontSize: "clamp(44px, 7vw, 92px)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          El que fas importa.
        </p>
        <p
          style={{
            margin: "clamp(8px, 2vh, 20px) 0 0",
            color: "rgba(255,255,255,0.25)",
            fontSize: "clamp(46px, 7.2vw, 98px)",
            fontWeight: 400,
            fontStyle: "italic",
            letterSpacing: "-0.01em",
          }}
        >
          Que se sàpiga, també.
        </p>
      </motion.div>
    </section>
  );
}
