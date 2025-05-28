import Link from "next/link";

const videos = [
  "chiikawa.mp4",
  "ensantina.mp4",
  "demo1.mp4",
  "demo2.mov",
  "salamander1.mp4",
  "salamander2.mp4",
  "forest_intro.mp4",
  "pizza.mp4"
];

export default function VideoChooser() {
  return (
    <div>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginLeft: 20}}>Available Videos</h1>
      <ul style={{ paddingLeft: "1rem" }}>
        {videos.map((v) => (
          <li key={v} style={{ marginBottom: "0.5rem", fontSize: "1.2rem", marginLeft: 20, marginTop: 10 }}>
            {v} -{" "}
            <Link
              href={`/preview/${encodeURIComponent(v)}`}
              style={{ textDecoration: "underline", color: "purple", marginRight: "1rem" }}
            >
              Preview
            </Link>
            -{" "}
            <Link
              href={`/playback/${encodeURIComponent(v)}`}
              style={{ textDecoration: "underline", color: "blue" }}
            >
              Playback
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
