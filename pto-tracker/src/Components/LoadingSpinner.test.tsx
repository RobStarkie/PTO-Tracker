import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';
import './LoadingSpinner.css'; 

describe('LoadingSpinner', () => {
  it('renders correctly when loading', () => {
    const { asFragment } = render(<LoadingSpinner isLoading={true} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when not loading', () => {
    const { asFragment } = render(<LoadingSpinner isLoading={false} />);
    expect(asFragment()).toMatchSnapshot();
  });
});