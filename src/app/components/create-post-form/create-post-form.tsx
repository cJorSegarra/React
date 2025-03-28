import { useState } from "react";
import { Post } from "../../types/post.type";
import "./create-post-form.scss";

interface Props {
    onSave: (post: Post) => void;
    onCancel: () => void;
}

const CreatePostForm = ({ onSave, onCancel }: Props) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState(1);
    const [error, setError] = useState("");
    const EMPTY_ERROR = "Title and Body cannot be empty";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !body) {
            setError(EMPTY_ERROR);
            return;
        }
        const newPost: Post = {
            //This is temporal till I connect my api
            id: Date.now(),
            title,
            body,
            userId,
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
                <label>
                    User ID:
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(Number(e.target.value))}
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
