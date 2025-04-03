import { Comment } from "../../types/comment.type";
import "./comment-item.scss";

interface CommentItemProps {
    comment: Comment;
    onEdit: (comment: Comment) => void;
    onDelete: (commentId: number) => void;
}

const CommentItem = ({ comment, onEdit, onDelete }: CommentItemProps) => {
    return (
        <div className="comment-item">
            <p>{comment.body}</p>
            <span>Comment by User ID: {comment.userId}</span>
            <button onClick={() => onEdit(comment)}>Edit</button>
            <button onClick={() => onDelete(comment.id)}>Delete</button>
        </div>
    );
};

export default CommentItem;
