import { useState } from "react";
import { Post } from "../../types/post.type";
import "./create-post-form.scss";

interface Props {
    onSave: (post: Post) => void;
    onCancel: () => void;
}

const EMPTY_POST = { title: "", body: "", userId: 1 };

const CreatePostForm = ({ onSave, onCancel }: Props) => {
    const [post, setPost] = useState(EMPTY_POST);
    const [error, setError] = useState("");
    const EMPTY_ERROR = "Title and Body cannot be empty";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!post.title || !post.body) {
            setError(EMPTY_ERROR);
            return;
        }
        const newPost: Post = {
            id: Date.now(),
            title: post.title,
            body: post.body,
            userId: post.userId,
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
                        value={post.title}
                        onChange={(e) =>
                            setPost({ ...post, title: e.target.value })
                        }
                    />
                </label>
                <label>
                    Body:
                    <textarea
                        value={post.body}
                        onChange={(e) =>
                            setPost({ ...post, body: e.target.value })
                        }
                    />
                </label>
                <label>
                    User ID:
                    <input
                        type="number"
                        value={post.userId}
                        onChange={(e) =>
                            setPost({ ...post, userId: Number(e.target.value) })
                        }
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
