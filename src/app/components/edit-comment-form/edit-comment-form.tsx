import React, { useState } from "react";
import { Comment } from "../../types/comment.type";
import "./edit-comment-form.scss";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const [body, setBody] = useState(comment.body);
    const EMPTY_ERROR = t("empty_comment_error");
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
                    {t("comment")}:
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </label>
                <div>
                    <strong>{t("user_id")}:</strong> {comment.userId}
                </div>
                <div>
                    <strong>{t("post_id")}:</strong> {comment.postId}
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">{t("save")}</button>
                <button type="button" onClick={onCancel}>
                    {t("cancel")}
                </button>
            </form>
        </div>
    );
};

export default EditCommentForm;
