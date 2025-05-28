import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Salamander Tracker",
  description: "Routing & Layout Setup",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header style={{ padding: 20, borderBottom: "1px solid #ccc" }}>
          <nav>
            <Link href="/" style={{ marginRight: 15 }}>
              Home
            </Link>
            <Link href="/videos">Videos</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
