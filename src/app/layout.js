import "./globals.css";

export const metadata = {
  title: "ASSE7 · Identitat · Estratègia · Presència",
  description:
    "ASSE7 ['as.et] — Agència d'identitat, estratègia i presència digital. Transformem marques en experiències memorables.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, background: "#000", overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
