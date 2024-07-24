import "./BlogPostList.scss";
import React, { useContext, useEffect, useState } from 'react';
import BlogPostItem from '../BlogPostItem/BlogPostItem';
import { PostContext } from '../PostsContext';
import Spinner from "../Spinner/Spinner";
const BlogPostList = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    const { allBlogPost, setAllBlogPost } = useContext(PostContext);

    function fetchData() {
        if(!allBlogPost?.length) {
            fetch(`https://newsapi.org/v2/everything?q=technology&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}`).then(async response => {
                if(response) {  
                    const res = await response.json();
                    if(res?.articles?.length) {
                        setPosts(res.articles);
                        setAllBlogPost(res.articles);
                    }
                }
            });
        } else {
            setPosts(allBlogPost);
        }
    }

    useEffect(() => {
        fetchData();
    }, [page]);

    if(!allBlogPost?.length) return <Spinner/>;
    
    return (
        <div className="blogs-list">
            <div className="blog-post-list">
                {posts.map((post, index) => (
                    <div className="blog-post-item" key={index}>
                        <BlogPostItem post={post} />
                    </div>
                ))}
            </div>
            <div className="pagination-buttons">
                <button className="btn btn-primary" onClick={() => { setAllBlogPost([]); setPage(page - 1); }} disabled={page === 1}>Previous</button>
                <button className="btn btn-primary" onClick={() => { setAllBlogPost([]); setPage(page + 1); }}>Next</button>
            </div>
        </div>
    );
};

export default BlogPostList;