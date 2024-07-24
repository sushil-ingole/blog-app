import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogPostItem from './BlogPostItem';

const post = {
    title: 'Sample Title',
    description: 'Sample Description',
    publishedAt: '2024-07-24T00:00:00Z'
};

describe('BlogPostItem', () => {
    test('renders blog post title', () => {
        render(<BlogPostItem post={post} />, { wrapper: MemoryRouter });
        expect(screen.getByText('Sample Title')).toBeInTheDocument();
    });

    test('renders blog post description', () => {
        render(<BlogPostItem post={post} />, { wrapper: MemoryRouter });
        expect(screen.getByText('Sample Description')).toBeInTheDocument();
    });

    test('renders formatted publication date', () => {
        render(<BlogPostItem post={post} />, { wrapper: MemoryRouter });
        expect(screen.getByText('24/7/2024')).toBeInTheDocument();
    });

    test('renders "Read More" button with correct link', () => {
        render(<BlogPostItem post={post} />, { wrapper: MemoryRouter });
        const button = screen.getByText('Read More');
        expect(button).toBeInTheDocument();
        expect(button.closest('a')).toHaveAttribute('href', '/post/2024-07-24T00:00:00Z');
    });

    test('button has correct styling', () => {
        render(<BlogPostItem post={post} />, { wrapper: MemoryRouter });
        const button = screen.getByText('Read More');
        expect(button).toHaveClass('btn btn-primary text-white');
    });
});
