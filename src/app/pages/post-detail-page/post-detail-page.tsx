import { useParams, useNavigate } from "react-router-dom";
import { useGetPostByIdQuery } from "../../api/postApiSlice";
import "./post-detail-page.scss";

const PostDetailPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();

    const {
        data: post,
        error,
        isLoading,
    } = useGetPostByIdQuery(Number(postId));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading post</div>;
    }

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
            <div className="comments">
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <p>{comment.body}</p>
                            <span>Comment by User ID: {comment.userId}</span>
                        </div>
                    ))
                ) : (
                    <p>No comments available</p>
                )}
            </div>
        </div>
    );
};

export default PostDetailPage;
