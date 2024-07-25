import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from "./components/Home/Home";
import BlogPostDetails from "./components/BlogPostDetails/BlogPostDetails";
import PostProvider from "./components/PostsContext";

const router = createHashRouter([
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
