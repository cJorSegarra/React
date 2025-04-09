import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { NewPost } from "../../types/post.type";
import "./create-post-form.scss";

interface Props {
    onSave: (post: NewPost) => void;
    onCancel: () => void;
}

const CreatePostForm = ({ onSave, onCancel }: Props) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");
    const EMPTY_ERROR = "Title and Body cannot be empty";

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
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Body:
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
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

export default CreatePostForm;