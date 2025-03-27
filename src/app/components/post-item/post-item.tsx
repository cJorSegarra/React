import { Post } from "../../types/post.type";
import "./post-item.scss";

interface Props {
    post: Post;
}

const PostItem = ({ post }: Props) => {
    return (
        <div className="post-item">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="post-meta">
                <span>User ID: {post.userId}</span>
                <span>Post ID: {post.id}</span>
            </div>
        </div>
    );
};

export default PostItem;
