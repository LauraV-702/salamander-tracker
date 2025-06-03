'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// Component that fetches and displays a list of available videos
export default function VideoChooserPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Fetch the list of videos from the backend API
        const response = await fetch('http://localhost:3001/api/videos');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    // Call the async fetch function
    fetchVideos();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Available Videos</h1>
      <ul>
        {videos.map((filename) => (
          <li key={filename}>
            {filename} -{' '}
            <Link href={`/preview/${filename}`}>
              <u>Preview</u>
            </Link>{' '}
            -{' '}
            <a
              href={`http://localhost:3001/videos/${filename}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <u>Playback</u>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
