import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogPostDetails from './BlogPostDetails';
import { PostContext } from '../PostsContext';
import * as router from 'react-router';

const mockPost = {
    title: 'Sample Title',
    description: 'Sample Description',
    content: 'Sample Content',
    publishedAt: '2024-07-24T00:00:00Z',
    urlToImage: 'http://example.com/image.jpg'
};

const renderWithContext = (post) => {
    return render(
        <MemoryRouter initialEntries={['/post/2024-07-24T00:00:00Z']}>
            <PostContext.Provider value={{ allBlogPost: post ? [post] : [] }}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostDetails />} />
                    <Route path="/" element={<div>Home Page</div>} />
                </Routes>
            </PostContext.Provider>
        </MemoryRouter>
    );
};

describe('BlogPostDetails', () => {
    const navigate = jest.fn();

    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders blog post details correctly', async () => {
        renderWithContext(mockPost);

        await waitFor(() => {
            expect(screen.getByText('Sample Title')).toBeInTheDocument();
            expect(screen.getByText('Sample Description')).toBeInTheDocument();
            expect(screen.getByText('Sample Content')).toBeInTheDocument();
            expect(screen.getByText('24/7/2024')).toBeInTheDocument();
        });
    });

    test('shows spinner while loading', () => {
        renderWithContext(null);

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('navigates back to home on clicking back icon', async () => {
        renderWithContext(mockPost);
        await waitFor(() => {
            expect(screen.getByText('Sample Title')).toBeInTheDocument();
        });
        const backIcon = screen.getByRole('link', { name: /back to posts/i });

        fireEvent.click(backIcon);
        await waitFor(() => {
            expect(navigate).toHaveBeenCalled();
            expect(navigate.mock.calls[0][0]).toBe('/');
        });
    });

    test('redirects to home if no post found', async () => {
        renderWithContext(null);

        await waitFor(() => {
            expect(navigate).toHaveBeenCalled();
            expect(navigate.mock.calls[0][0]).toBe('/');
        });
    });
});
