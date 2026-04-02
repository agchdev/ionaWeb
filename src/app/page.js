"use client";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";

// CustomCursor uses window on init, only render client-side
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function Home() {
  return (
    <>
      <CustomCursor />
      <main>
        <HeroSection />
        <StatementSection />
        <FAQSection />
        <ContactForm />
      </main>
      <footer>
        <p>© 2025 ASSE7</p>
        <p>Identitat · Estratègia · Presència</p>
      </footer>
    </>
  );
}
