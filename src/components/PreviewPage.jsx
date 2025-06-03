'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PreviewPage() {
  const { filename } = useParams();
  const [color, setColor] = useState('#551111');
  const [threshold, setThreshold] = useState(50);
  const [binImageUrl, setBinImageUrl] = useState('');

  // Update binarized preview when color or threshold changes
  useEffect(() => {
    if (filename) {
      const url = `http://localhost:3001/preview/${filename}?targetColor=${color.replace('#', '')}&threshold=${threshold}`;
      setBinImageUrl(url);
    }
  }, [filename, color, threshold]);

  const handleProcess = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/process/${filename}?targetColor=${color.replace('#', '')}&threshold=${threshold}`,
        { method: 'POST' }
      );
      const data = await res.json();
      console.log('Job started:', data);
    } catch (err) {
      console.error('Error starting job:', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Preview Processing</h1>

      <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
        <label style={{ marginRight: 10 }}>Target Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ marginRight: 20 }}
        />
        <label style={{ marginRight: 10 }}>Threshold:</label>
        <input
          type="range"
          min="0"
          max="255"
          value={threshold}
          onChange={(e) => setThreshold(parseInt(e.target.value))}
        />
        <span style={{ marginLeft: 10 }}>{threshold}</span>
      </div>

      <div style={{ display: 'flex', gap: 30 }}>
        <div>
          <h3>Original Frame (with centroid)</h3>
          <img
            src={`http://localhost:3001/thumbnail/${filename}`}
            alt="Original"
            width="400"
            style={{ border: '1px solid gray' }}
          />
        </div>
        <div>
          <h3>Binarized Frame (with centroid)</h3>
          {/* <img
            src={binImageUrl}
            alt="Binarized"
            width="400"
            style={{ border: '1px solid gray' }}
          /> */}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={handleProcess}>
          Process Video with These Settings
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        <Link href="/videos">Back to Videos</Link>
      </div>
    </div>
  );
}
