'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function VideoChooserPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/videos');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Available Videos</h1>
      {videos.map((filename) => (
        <div key={filename} style={{ marginBottom: 20 }}>
          <h3>{filename}</h3>
          <img
            src={`http://localhost:3001/thumbnail/${filename}`}
            alt={`Thumbnail for ${filename}`}
            width="300"
          />
          <br />
          <Link href={`/preview/${filename}`}>Preview</Link>
        </div>
      ))}
    </div>
  );
}
