import "./Home.scss";
import React from 'react';
import BlogPostList from '../BlogPostList/BlogPostList';
const Home = () => {
    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Blog Posts</h1>
            </div>
            <BlogPostList />
        </div>
    );
};
export default Home;