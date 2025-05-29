import Link from "next/link";

export const metadata = {
  title: "Salamander Tracker",
  description: "Centroid Finder for the Salamanders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <header style={{ padding: 20, marginBottom: 20, borderBottom: "2px solid #ccc" }}>
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
