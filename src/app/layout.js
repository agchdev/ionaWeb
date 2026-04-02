import "./globals.css";

export const metadata = {
  title: "ASSE7 · Identitat · Estratègia · Presència",
  description:
    "ASSE7 ['as.et] — Agència d'identitat, estratègia i presència digital. Transformem marques en experiències memorables.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <body style={{ margin: 0, background: "#000", overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
