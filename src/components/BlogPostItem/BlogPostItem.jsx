import React from 'react';
import { Link } from 'react-router-dom';
const BlogPostItem = ({ post }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                <p className="card-text"><small className="text-muted">{new Date(post.publishedAt).toLocaleDateString()}</small></p>
                <Link to={`/post/${post.publishedAt}`} className="btn btn-primary text-white">Read More</Link>
            </div>
        </div>
    );
};
export default BlogPostItem;