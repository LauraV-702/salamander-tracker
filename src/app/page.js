'use client';

import Link from 'next/link';
import { Box, Typography, Container, Button } from '@mui/material';

export default function HomePage() {
  return (
    <Box
      sx={{
        bgcolor: '#D2665A',
        minHeight: '100vh',
        py: 8,
        fontFamily: '"Quicksand", sans-serif',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: '#F2E8CF',
          borderRadius: 3,
          p: 5,
          textAlign: 'center',
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: '"Cabin", sans-serif', 
            fontWeight: 700,
          }}
        >
          Welcome to the Salamander Tracker!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 2,
            fontFamily: '"Quicksand", sans-serif', 
            fontSize: '1.1rem',
          }}
        >
          Go to{' '}
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/videos"
            sx={{
              fontFamily: '"Cabin", sans-serif',
              fontWeight: 600,
            }}
          >
            Videos
          </Button>{' '}
          to see all available videos for Centroid Processing. 🦎
        </Typography>
      </Container>
    </Box>
  );
}
