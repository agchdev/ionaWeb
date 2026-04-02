import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "ASSE7 · Identitat · Estratègia · Presència",
  description:
    "ASSE7 ['as.et] — Agència d'identitat, estratègia i presència digital. Transformem marques en experiències memorables.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <body className={poppins.className} style={{ margin: 0, background: "#000", overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
