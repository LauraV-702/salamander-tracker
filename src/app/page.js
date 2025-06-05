'use client';

import Link from 'next/link';
import { Box, Typography, Container, Button, keyframes } from '@mui/material';

// Define the spin animation using keyframes
const spin = {
  animation: 'spin 4s linear infinite',
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
};

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

        {/* Spinning mascot */}
        <Box
          sx={{
            fontSize: '4rem',
            my: 10, 
            display: 'inline-block',
            ...spin,
          }}
          role="img"
          aria-label="Spinning salamander mascot"
        >
          🌿🦎🌿
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontStyle: 'italic',
            color: '#7A583A',
            mb: 3,
            fontFamily: '"Quicksand", sans-serif',
          }}
        >
          Did you know? The name Salamander comes from the Greek word for Fire Lizard!
          <br />
          -{' '}
          <Link href="https://www.reptilegardens.com/animals/amphibians-and-bugs/salamanders/" target="_blank" rel="noopener noreferrer" style={{ color: '#7A583A', textDecoration: 'underline' }}>
              reptilegardens.com
          </Link>
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
            data-cy="video-btn"
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
          to see all available videos for Centroid Processing.
        </Typography>
      </Container>
    </Box>
  );
}
