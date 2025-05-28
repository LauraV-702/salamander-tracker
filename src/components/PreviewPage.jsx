// components/PreviewPage.jsx
export default function PreviewPage({ filename }) {
    return (
      <div>
        <h1>Previewing: {filename}</h1>
        <video src={`/videos/${filename}`} controls width="600" />
      </div>
      
    );
  }
  