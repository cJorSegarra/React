import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import {
    fetchPosts,
    updatePostLocally,
    deletePostLocally,
} from "../../store/posts/postSlice";
import { Post } from "../../types/post.type";
import PostItem from "../../components/post-item/post-item";
import EditPostForm from "../../components/edit-post-form/edit-post-form";
import "./posts-page.scss";

const PostsPage = () => {
    const dispatch = useAppDispatch();
    const { posts, status, error } = useAppSelector((state) => state.posts);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

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

    const handleSave = (post: Post) => {
        dispatch(updatePostLocally(post));
        setEditingPost(null);
    };

    const handleCancel = () => {
        setEditingPost(null);
    };

    return (
        <div className="page-container">
            <h1>Posts</h1>
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
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default PostsPage;
