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

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!filename) return;
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = `http://localhost:3001/thumbnail/${filename}`;

    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
  }, [filename]);

  useEffect(() => {
    if (imageLoaded) {
      processImage();
    }
  }, [imageLoaded, color, threshold]);

  const processImage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;

    const targetRGB = hexToRgb(color);
    const binaryImage = [];

    for (let y = 0; y < canvas.height; y++) {
      binaryImage[y] = [];
      for (let x = 0; x < canvas.width; x++) {
        const pixelIndex = (y * canvas.width + x) * 4;
        const red = pixelData[pixelIndex];
        const green = pixelData[pixelIndex + 1];
        const blue = pixelData[pixelIndex + 2];

        const distanceToTarget = Math.sqrt(
          Math.pow(red - targetRGB.r, 2) +
          Math.pow(green - targetRGB.g, 2) +
          Math.pow(blue - targetRGB.b, 2)
        );

        const isWhite = distanceToTarget <= threshold;
        binaryImage[y][x] = isWhite ? 1 : 0;

        pixelData[pixelIndex] = isWhite ? 255 : 0;
        pixelData[pixelIndex + 1] = isWhite ? 255 : 0;
        pixelData[pixelIndex + 2] = isWhite ? 255 : 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const centroid = findCentroid(binaryImage);
    if (centroid) {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(centroid.x, centroid.y, 4, 0, 2 * Math.PI);
      ctx.fill();
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

    const bfs = (startY, startX) => {
      const queue = [[startY, startX]];
      const pixels = [];
      visited[startY][startX] = true;

      while (queue.length > 0) {
        const [currentY, currentX] = queue.shift();
        pixels.push([currentY, currentX]);

        for (const [dy, dx] of directions) {
          const newY = currentY + dy;
          const newX = currentX + dx;

          if (
            newY >= 0 && newY < height &&
            newX >= 0 && newX < width &&
            !visited[newY][newX] && binary[newY][newX] === 1
          ) {
            visited[newY][newX] = true;
            queue.push([newY, newX]);
          }
        }
      }

      return pixels;
    };

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
    const red = parseInt(hex.substring(1, 3), 16);
    const green = parseInt(hex.substring(3, 5), 16);
    const blue = parseInt(hex.substring(5, 7), 16);
    return { r: red, g: green, b: blue };
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
          <h3>Original Frame</h3>
          <img
            src={`http://localhost:3001/thumbnail/${filename}`}
            alt="Original"
            width="400"
            style={{ border: '1px solid gray' }}
          />
        </div>
        <div>
          <h3>Binarized Frame (with centroid)</h3>
          <canvas ref={canvasRef} style={{ border: '1px solid gray' }} />
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <Link href="/videos">Back to Videos</Link>
      </div>
    </div>
  );
}
