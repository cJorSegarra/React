import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { fetchPosts } from "../../store/posts/postSlice";
import PostItem from "../../components/post-item/post-item";
import "./posts-page.scss";

const PostsPage = () => {
    const dispatch = useAppDispatch();
    const { posts, status, error } = useAppSelector((state) => state.posts);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    return (
        <div className="page-container">
            <h1>Posts</h1>
            {status === "loading" && <div>Loading...</div>}
            {status === "failed" && <div>Error: {error}</div>}
            {status === "succeeded" && (
                <div>
                    {posts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostsPage;
