import { render, screen } from '@testing-library/react';
import Navbar from './components/Navbar';
import React from 'react';

describe('Navbar', () => {
  it('renders the LendingAI title', () => {
    render(<Navbar />);
    expect(screen.getByText('LendingAI')).toBeInTheDocument();
  });

  it('renders the user avatar', () => {
    render(<Navbar />);
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });

  it('applies responsive padding classes', () => {
    render(<Navbar />);
    const headerDiv = screen.getByText('LendingAI').closest('div');
    expect(headerDiv).toHaveClass('px-margin-mobile');
    expect(headerDiv).toHaveClass('md:px-margin-desktop');
  });

  it('applies responsive font size to LendingAI title', () => {
    render(<Navbar />);
    const titleSpan = screen.getByText('LendingAI');
    expect(titleSpan).toHaveClass('text-headline-sm');
    expect(titleSpan).toHaveClass('md:text-headline-md');
  });
});