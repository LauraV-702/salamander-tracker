import Link from 'next/link';

export default function PreviewPage({ filename }) {
  return (
    <div>
      <h1 style={{ marginBottom: 25, marginLeft: 20 }}>Previewing: {filename}</h1>
      <video src={`/videos/${filename}`} controls width="600" />
      <div style={{ marginLeft: 30 }}>
        <Link style={{ backgroundColor: "green", padding: 20}} href="/videos">Back to Videos</Link>
      </div>
    </div>
  );
}
  