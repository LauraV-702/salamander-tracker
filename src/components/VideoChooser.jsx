'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

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
    <Box
      sx={{
        bgcolor: '#6A994E',
        minHeight: '100vh',
        py: 6,
        fontFamily: '"Quicksand", sans-serif',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: '#F2E8CF',
          borderRadius: 3,
          p: 4,
          boxShadow: 3,
        }}
      >
        <Typography
          data-cy="available-videos"
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: '"Cabin", sans-serif',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          🎥 Available Videos
        </Typography>

        <List>
          {videos.map((filename) => (
            <ListItem
              key={filename}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                p: 2,
                bgcolor: '#ffffff',
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <ListItemText
                primary={filename}
                primaryTypographyProps={{
                  fontWeight: 'bold',
                  sx: { fontFamily: '"Quicksand", sans-serif' },
                }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  component={Link}
                  href={`/preview/${filename}`}
                  sx={{
                    backgroundColor: '#386641',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#2f5233',
                    },
                    fontFamily: '"Cabin", sans-serif',
                    minWidth: '90px',
                  }}
                >
                  Preview
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  href={`http://localhost:3001/videos/${filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ fontFamily: '"Cabin", sans-serif', minWidth: '90px' }}
                >
                  Playback
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}
