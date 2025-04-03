import React, { useState } from "react";
import { Comment } from "../../types/comment.type";
import "./edit-comment-form.scss";

interface EditCommentFormProps {
    comment: Comment;
    onSave: (comment: Comment) => void;
    onCancel: () => void;
}

const EditCommentForm = ({
    comment,
    onSave,
    onCancel,
}: EditCommentFormProps) => {
    const [body, setBody] = useState(comment.body);
    const EMPTY_ERROR = "Comment cannot be empty";
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!body) {
            setError(EMPTY_ERROR);
            return;
        }
        onSave({ ...comment, body });
    };

    return (
        <div className="edit-comment-form">
            <form onSubmit={handleSubmit}>
                <label>
                    Comment:
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </label>
                <div>
                    <strong>User ID:</strong> {comment.userId}
                </div>
                <div>
                    <strong>Post ID:</strong> {comment.postId}
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditCommentForm;
