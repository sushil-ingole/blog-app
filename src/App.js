import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./components/Home/Home";
import BlogPostDetails from "./components/BlogPostDetails/BlogPostDetails";
import PostProvider from "./components/PostsContext";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/post/:id',
    element: <BlogPostDetails />
  }
]);

function App() {
  return (
    <PostProvider>
      <RouterProvider router={router} />
    </PostProvider>
  );
}

export default App;
