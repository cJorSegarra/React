import { Comment } from "../../types/comment.type";
import "./comment-item.scss";

interface CommentItemProps {
    comment: Comment;
    currentUserId: number | null;
    onEdit: (comment: Comment) => void;
    onDelete: (commentId: number) => void;
}

const CommentItem = ({
    comment,
    currentUserId,
    onEdit,
    onDelete,
}: CommentItemProps) => {
    return (
        <div className="comment-item">
            <p>{comment.body}</p>
            <span>Comment by User ID: {comment.userId}</span>
            {currentUserId === comment.userId && (
                <>
                    <button onClick={() => onEdit(comment)}>Edit</button>
                    <button onClick={() => onDelete(comment.id)}>Delete</button>
                </>
            )}
        </div>
    );
};

export default CommentItem;
