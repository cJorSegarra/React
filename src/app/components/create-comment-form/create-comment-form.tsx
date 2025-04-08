import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { NewComment } from "../../types/comment.type";
import "./create-comment-form.scss";

interface CreateCommentFormProps {
    postId: number;
    onSave: (comment: NewComment) => void;
    onCancel: () => void;
}

const CreateCommentForm = ({
    postId,
    onSave,
    onCancel,
}: CreateCommentFormProps) => {
    const [body, setBody] = useState("");
    const [error, setError] = useState("");
    const EMPTY_ERROR = "Comment cannot be empty";

    const userId = useSelector((state: RootState) => state.auth.id);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!body) {
            setError(EMPTY_ERROR);
            return;
        }
        const newComment: NewComment = {
            body,
            userId: userId!,
            postId,
        };
        onSave(newComment);
    };

    return (
        <div className="create-comment-form">
            <form onSubmit={handleSubmit}>
                <label>
                    Comment:
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </label>
                <label>
                    Post ID:
                    <input type="number" value={postId} readOnly disabled />
                </label>
                {error && <div className="error">{error}</div>}
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default CreateCommentForm;
