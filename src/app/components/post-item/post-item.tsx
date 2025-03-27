import { Link } from "react-router-dom";
import { Post } from "../../types/post.type";
import "./post-item.scss";

interface Props {
    post: Post;
    onEdit: (post: Post) => void;
    onDelete: (postId: number) => void;
}

const PostItem = ({ post, onEdit, onDelete }: Props) => {
    const commentsToShow = post.comments?.slice(0, 2) || [];

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
            <div className="comments">
                {commentsToShow.length > 0 ? (
                    commentsToShow.map((comment) => (
                        <div key={comment.id} className="comment">
                            <p>{comment.body}</p>
                            <span>Comment by User ID: {comment.userId}</span>
                        </div>
                    ))
                ) : (
                    <p>No comments available</p>
                )}
            </div>
            <button onClick={() => onEdit(post)}>Edit</button>
            <button onClick={() => onDelete(post.id)}>Delete</button>
        </div>
    );
};

export default PostItem;
