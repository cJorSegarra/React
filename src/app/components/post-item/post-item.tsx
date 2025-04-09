import { Link } from "react-router-dom";
import { Post } from "../../types/post.type";
import "./post-item.scss";

interface Props {
    post: Post;
    currentUserId: number | null;
    onEdit: (post: Post) => void;
    onDelete: (postId: number) => void;
}

const PostItem = ({ post, currentUserId, onEdit, onDelete }: Props) => {
    return (
        <div className="post-item">
            <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
            </Link>
            <p>{post.body}</p>
            <div className="post-meta">
                <span>User ID: {post.userId}</span>
                <span>Post ID: {post.id}</span>
            </div>
            {currentUserId === post.userId && (
                <>
                    <button onClick={() => onEdit(post)}>Edit</button>
                    <button onClick={() => onDelete(post.id)}>Delete</button>
                </>
            )}
        </div>
    );
};

export default PostItem;