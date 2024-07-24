import "./BlogPostDetails.scss";
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PostContext } from '../PostsContext';
import Spinner from "../Spinner/Spinner";

const BlogPostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { allBlogPost } = useContext(PostContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(allBlogPost?.length) {
            const foundPost = allBlogPost.find(article => article?.publishedAt === id);
            setPost(foundPost);
        } else {
            navigate('/');
        }
    }, [id]);
    if (!post) return <Spinner/>;
    return (
        <div className="blog-post-details mt-1 mb-1">
            <span to="/" className="back-icon" onClick={() => navigate('/')}><i className="fa fa-solid fa-arrow-left"></i></span><h1 className="blog-post-details-heading">Blog Posts Details</h1>
            <div className="card">
                <img src={post.urlToImage} alt={post.title} height={350} width={300} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text"><strong>Description: </strong>{post.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Content: </strong>{post.content}</li>
                    <li className="list-group-item"><strong>Published At: </strong>{new Date(post.publishedAt).toLocaleDateString()}</li>
                </ul>
            </div>
            <div className="back-button mt-3">
                <Link to="/" className="btn btn-md btn-info"><i className="fa fa-solid fa-arrow-left"></i> Back to Posts</Link>
            </div>

        </div>
    );
};
export default BlogPostDetails;