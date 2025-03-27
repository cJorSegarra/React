import { Post } from "../../types/post.type";
import "./post-item.scss";

interface Props {
    post: Post;
    onEdit: (post: Post) => void;
    onDelete: (postId: number) => void;
}

const PostItem = ({ post, onEdit, onDelete }: Props) => {
    return (
        <div className="post-item">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="post-meta">
                <span>User ID: {post.userId}</span>
                <span>Post ID: {post.id}</span>
            </div>
            <button onClick={() => onEdit(post)}>Edit</button>
            <button onClick={() => onDelete(post.id)}>Delete</button>
        </div>
    );
};

export default PostItem;
