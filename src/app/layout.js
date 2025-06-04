import Link from 'next/link';

export const metadata = {
  title: 'Salamander Tracker',
  description: 'Centroid Finder for the Salamanders',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        style={{ fontFamily: '"Quicksand", sans-serif', margin: 0 }}
      >
        <header
          style={{
            backgroundColor: '#D2D0A0', 
            color: '#075B5E',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: '"Cabin", sans-serif',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Centroid Finder</h1>
          <nav>
            <Link
              href="/"
              style={{
                marginRight: 20,
                color: 'black',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Home
            </Link>
            <Link
              href="/videos"
              style={{
                color: 'black',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Videos
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
