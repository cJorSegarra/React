import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { NewPost } from "../../types/post.type";
import "./create-post-form.scss";
import { useTranslation } from "react-i18next";

interface Props {
    onSave: (post: NewPost) => void;
    onCancel: () => void;
}

const CreatePostForm = ({ onSave, onCancel }: Props) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");
    const EMPTY_ERROR = t("empty_error");

    const userId = useSelector((state: RootState) => state.auth.id);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !body) {
            setError(EMPTY_ERROR);
            return;
        }
        const newPost: NewPost = {
            title,
            body,
            userId: userId!,
        };
        onSave(newPost);
    };

    return (
        <div className="create-post-form">
            <form onSubmit={handleSubmit}>
                <label>
                    {t("title")}:
                    <input
                        data-cy-test="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    {t("body")}:
                    <textarea
                        data-cy-test="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </label>
                {error && <div className="error">{error}</div>}
                <button type="submit" data-cy-test="save-post">
                    {t("save")}
                </button>
                <button
                    type="button"
                    data-cy-test="cancel-post"
                    onClick={onCancel}
                >
                    {t("cancel")}
                </button>
            </form>
        </div>
    );
};

export default CreatePostForm;
