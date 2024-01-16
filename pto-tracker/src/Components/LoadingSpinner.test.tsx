import React from 'react';
import renderer from 'react-test-renderer';
import LoadingSpinner from './LoadingSpinner';
import './LoadingSpinner.css';

describe('LoadingSpinner', () => {
  it('renders correctly when loading', () => {
    const tree = renderer.create(
      <LoadingSpinner isLoading={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when not loading', () => {
    const tree = renderer.create(
      <LoadingSpinner isLoading={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
