// components/VideoChooser.jsx
import Link from "next/link";

const videos = ["Chiikawa.mp4", "Ensantina.mp4"];

export default function VideoChooser() {
  return (
    <div>
      <h1>Select a Video</h1>
      <ul>
        {videos.map((v) => (
          <li key={v}>
            <Link href={`/preview/${v}`}>{v}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
