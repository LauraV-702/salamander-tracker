// tests/home.test.js
import { render, screen } from '@testing-library/react';
import HomePage from '../src/app/page'; // adjust path
import '@testing-library/jest-dom';

describe('HomePage', () => {
  test('renders welcome text', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/Welcome to the Salamander Tracker!/i)
    ).toBeInTheDocument();
  });

  test('renders video link', () => {
    render(<HomePage />);
    // The "Videos" button is actually a link
    expect(
      screen.getByRole('link', { name: /videos/i })
    ).toBeInTheDocument();
  });
});
