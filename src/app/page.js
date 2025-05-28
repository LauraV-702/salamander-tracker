import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 style={{ marginBottom: 25}}>🦎 Welcome to the Salamander Tracker!</h1>
      <p style={{ marginLeft: 15 }}>
        Go to <Link href="/videos">`Videos`</Link> to see all available videos for Centroid Processing.
      </p>
    </div>
  );
}
