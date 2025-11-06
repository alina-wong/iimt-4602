import "./globals.css";
import Header from "./components/Header";
import ClientThemeProvider from "./components/ClientThemeProvider";

export const metadata = {
  title: "Omniverse",
  description: "Omniverse - Homepage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {/* Theme + global header */}
        <ClientThemeProvider>
          <Header />
          <main style={{ marginTop: "64px" }}>{children}</main>
        </ClientThemeProvider>
      </body>
    </html>
  );
}