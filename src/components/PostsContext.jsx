import { createContext, useState } from "react";

export const PostContext = createContext(null);

const PostProvider = ({ children }) => {
    const [allBlogPost, setAllBlogPost] = useState();
    const obj = {allBlogPost, setAllBlogPost};
    return (
        <PostContext.Provider value={obj}>
            {children}
        </PostContext.Provider>
    )
}

export default PostProvider;