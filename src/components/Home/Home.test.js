// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

jest.mock('../BlogPostList/BlogPostList', () => () => <div>Mocked BlogPostList</div>);

describe('Home', () => {
    test('renders home header and BlogPostList', () => {
        render(<Home />);
        expect(screen.getByText('Blog Posts')).toBeInTheDocument();
        expect(screen.getByText('Mocked BlogPostList')).toBeInTheDocument();
    });
});