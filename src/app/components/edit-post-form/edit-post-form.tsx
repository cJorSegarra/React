import { useState } from "react";
import { Post } from "../../types/post.type";
import "./edit-post-form.scss";

interface Props {
    post: Post;
    onSave: (post: Post) => void;
    onCancel: () => void;
}

const EditPostForm = ({ post, onSave, onCancel }: Props) => {
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [error, setError] = useState("");
    const EMPTY_ERROR = "Title and Body cannot be empty";

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
                    <input type="text" value={post.userId} readOnly />
                </label>
                <label>
                    Post ID:
                    <input type="text" value={post.id} readOnly />
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

export default EditPostForm;