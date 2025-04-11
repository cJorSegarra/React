import { useState } from "react";
import { Post } from "../../types/post.type";
import "./edit-post-form.scss";
import { useTranslation } from "react-i18next";

interface Props {
    post: Post;
    onSave: (post: Post) => void;
    onCancel: () => void;
}

const EditPostForm = ({ post, onSave, onCancel }: Props) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [error, setError] = useState("");
    const EMPTY_ERROR = t("empty_error");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !body) {
            setError(EMPTY_ERROR);
            return;
        }
        onSave({ ...post, title, body });
    };

    return (
        <div className="edit-post-form">
            <form onSubmit={handleSubmit}>
                <label>
                    {t("title")}:
                    <input
                        data-cy-test="edit-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    {t("body")}:
                    <textarea
                        data-cy-test="edit-body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </label>
                <label>
                    {t("user_id")}:
                    <input type="text" value={post.userId} readOnly />
                </label>
                <label>
                    {t("post_id")}:
                    <input type="text" value={post.id} readOnly />
                </label>
                {error && <div className="error">{error}</div>}
                <button type="submit" data-cy-test="edit-save-button">
                    {t("save")}
                </button>
                <button
                    type="button"
                    data-cy-test="edit-cancel-button"
                    onClick={onCancel}
                >
                    {t("cancel")}
                </button>
            </form>
        </div>
    );
};

export default EditPostForm;
