export default function PreviewPage({ filename }) {
  return (
    <div>
      <h1 style={{ marginBottom: 25 }}>Previewing: {filename}</h1>
      <video src={`/videos/${filename}`} controls width="600" />
    </div>
  );
}
  