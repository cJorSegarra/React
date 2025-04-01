import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import {
    fetchPosts,
    updatePostLocally,
    deletePostLocally,
    addPostLocally,
} from "../../store/posts/postSlice";
import { Post } from "../../types/post.type";
import PostItem from "../../components/post-item/post-item";
import EditPostForm from "../../components/edit-post-form/edit-post-form";
import CreatePostForm from "../../components/create-post-form/create-post-form";
import "./posts-page.scss";

const PostsPage = () => {
    const dispatch = useAppDispatch();
    const { posts, status, error } = useAppSelector((state) => state.posts);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [creatingPost, setCreatingPost] = useState(false);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    const handleEdit = (post: Post) => {
        setEditingPost(post);
    };

    const handleDelete = (postId: number) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            dispatch(deletePostLocally(postId));
        }
    };

    const handleSaveEdit = (post: Post) => {
        dispatch(updatePostLocally(post));
        setEditingPost(null);
    };

    const handleSaveCreate = (post: Post) => {
        dispatch(addPostLocally(post));
        setCreatingPost(false);
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
    };

    const handleCancelCreate = () => {
        setCreatingPost(false);
    };

    return (
        <div className="page-container">
            <h1>Posts</h1>
            <button onClick={() => setCreatingPost(true)}>Create Post</button>
            {status === "loading" && <div>Loading...</div>}
            {status === "failed" && <div>Error: {error}</div>}
            {status === "succeeded" && (
                <div>
                    {posts.map((post) => (
                        <PostItem
                            key={post.id}
                            post={post}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
            {editingPost && (
                <EditPostForm
                    post={editingPost}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            )}
            {creatingPost && (
                <CreatePostForm
                    onSave={handleSaveCreate}
                    onCancel={handleCancelCreate}
                />
            )}
        </div>
    );
};

export default PostsPage;
