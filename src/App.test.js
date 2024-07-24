import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import BlogPostDetails from './components/BlogPostDetails/BlogPostDetails';
import { PostContext } from './components/PostsContext';
import '@testing-library/jest-dom/extend-expect';

const mockPost = {
  title: 'Sample Title',
  description: 'Sample Description',
  content: 'Sample Content',
  publishedAt: '2024-07-24T00:00:00Z',
  urlToImage: 'http://example.com/image.jpg'
};

const renderWithRouter = (ui, { route = '/', contextValue = { allBlogPost: [] } } = {}) => {
  const memoryRouter = createMemoryRouter(
    [
      { path: '/', element: <Home /> },
      { path: '/post/:id', element: <BlogPostDetails /> }
    ],
    {
      initialEntries: [route]
    }
  );

  return render(
    <PostContext.Provider value={contextValue}>
      <RouterProvider router={memoryRouter}>
        {ui}
      </RouterProvider>
    </PostContext.Provider>
  );
};

test('renders Home component on root path', () => {
  renderWithRouter(<Home />, { route: '/' });
  expect(screen.getByText('Blog Posts')).toBeInTheDocument();
});

test('renders BlogPostDetails component on /post/:id path', () => {
  renderWithRouter(<BlogPostDetails />, { route: '/post/2024-07-24T00:00:00Z', contextValue: { allBlogPost: [mockPost] } });
  expect(screen.getByText('Sample Title')).toBeInTheDocument();
  expect(screen.getByText('Sample Description')).toBeInTheDocument();
  expect(screen.getByText('Sample Content')).toBeInTheDocument();
  expect(screen.getByText('24/7/2024')).toBeInTheDocument();
});
