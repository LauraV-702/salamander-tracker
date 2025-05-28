import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Salamander Tracker</h1>
      <p>
        Go to <Link href="/videos">Videos</Link> to see available videos.
      </p>
    </div>
  );
}
