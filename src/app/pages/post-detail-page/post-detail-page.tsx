import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import "./post-detail-page.scss";

const PostDetailPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();

    const post = useAppSelector((state) =>
        state.posts.posts.find((p) => p.id === Number(postId))
    );

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="post-detail">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <div className="post-meta">
                <span>User ID: {post.userId}</span>
                <span>Post ID: {post.id}</span>
            </div>
        </div>
    );
};

export default PostDetailPage;
