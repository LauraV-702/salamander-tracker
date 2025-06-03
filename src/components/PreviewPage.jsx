'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function PreviewPage() {
  const { filename } = useParams();
  const [color, setColor] = useState('#551111');
  const [threshold, setThreshold] = useState(50);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const originalCanvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = `http://localhost:3001/thumbnail/${filename}`;
    imageRef.current = img;

    img.onload = () => {
      processImage();
    };
  }, [filename]);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      processImage();
    }
  }, [color, threshold]);

  const processImage = () => {
    const canvas = canvasRef.current;
    const originalCanvas = originalCanvasRef.current;
    if (!canvas || !originalCanvas) return;

    const ctx = canvas.getContext('2d');
    const originalCtx = originalCanvas.getContext('2d');
    if (!ctx || !originalCtx) return;

    const image = imageRef.current;
    canvas.width = 400;
    canvas.height = (image.height / image.width) * 400;
    originalCanvas.width = 400;
    originalCanvas.height = (image.height / image.width) * 400;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    originalCtx.drawImage(image, 0, 0, originalCanvas.width, originalCanvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const targetRGB = hexToRgb(color);
    const binary = [];

    for (let y = 0; y < canvas.height; y++) {
      binary[y] = [];
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const dist = Math.sqrt(
          Math.pow(r - targetRGB.r, 2) +
          Math.pow(g - targetRGB.g, 2) +
          Math.pow(b - targetRGB.b, 2)
        );

        if (dist <= threshold) {
          binary[y][x] = 1;
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        } else {
          binary[y][x] = 0;
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
        }
      }
    }

    const centroid = findCentroid(binary);
    ctx.putImageData(imageData, 0, 0);

    if (centroid) {
      ctx.strokeStyle = 'lime';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centroid.x, centroid.y, 6, 0, 2 * Math.PI);
      ctx.stroke();

      originalCtx.strokeStyle = 'lime';
      originalCtx.lineWidth = 2;
      originalCtx.beginPath();
      originalCtx.arc(centroid.x, centroid.y, 6, 0, 2 * Math.PI);
      originalCtx.stroke();
    }
  };

  const findCentroid = (binary) => {
    const height = binary.length;
    const width = binary[0].length;
    const visited = Array.from({ length: height }, () => Array(width).fill(false));
    let maxSize = 0;
    let maxCentroid = null;

    const directions = [
      [1, 0], [-1, 0], [0, 1], [0, -1]
    ];

    function bfs(startY, startX) {
      let q = [[startY, startX]];
      let pixels = [];
      visited[startY][startX] = true;

      while (q.length > 0) {
        const [y, x] = q.shift();
        pixels.push([y, x]);

        for (const [dy, dx] of directions) {
          const ny = y + dy;
          const nx = x + dx;

          if (
            ny >= 0 && ny < height &&
            nx >= 0 && nx < width &&
            !visited[ny][nx] && binary[ny][nx] === 1
          ) {
            visited[ny][nx] = true;
            q.push([ny, nx]);
          }
        }
      }

      return pixels;
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (binary[y][x] === 1 && !visited[y][x]) {
          const pixels = bfs(y, x);
          if (pixels.length > maxSize) {
            maxSize = pixels.length;
            const sum = pixels.reduce((acc, [py, px]) => [acc[0] + px, acc[1] + py], [0, 0]);
            maxCentroid = {
              x: Math.round(sum[0] / pixels.length),
              y: Math.round(sum[1] / pixels.length),
            };
          }
        }
      }
    }

    return maxCentroid;
  };

  const hexToRgb = (hex) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return { r, g, b };
  };

  const handleProcess = async () => {
    try {
      await fetch(
        `http://localhost:3001/process/${filename}?targetColor=${color.replace('#', '')}&threshold=${threshold}`,
        { method: 'POST' }
      );
    } catch (err) {
      // Handle error when needed
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
          <canvas ref={originalCanvasRef} style={{ border: '1px solid gray', width: '400px' }} />
        </div>
        <div>
          <h3>Binarized Frame (with centroid)</h3>
          <canvas ref={canvasRef} style={{ border: '1px solid gray', width: '400px' }} />
        </div>
      </div>
      <button style={{ marginTop: 20 }} onClick={handleProcess}>
        Process Video with These Settings
      </button>
      <div style={{ marginTop: 30 }}>
        <Link href="/videos">Back to Videos</Link>
      </div>
    </div>
  );
}
