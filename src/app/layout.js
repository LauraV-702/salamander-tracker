import Link from 'next/link';

export const metadata = {
  title: 'Salamander Tracker',
  description: 'Centroid Finder for the Salamanders',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true} style={{ fontFamily: '"Quicksand", sans-serif' }}>
        <header
          style={{
            padding: 20,
            marginBottom: 20,
            borderBottom: '2px solid #ccc',
            fontFamily: '"Cabin", sans-serif',
          }}
        >
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
