import { Link } from "react-router-dom";
import { Post } from "../../types/post.type";
import "./post-item.scss";
import { useTranslation } from "react-i18next";

interface Props {
    post: Post;
    currentUserId: number | null;
    onEdit: (post: Post) => void;
    onDelete: (postId: number) => void;
}

const PostItem = ({ post, currentUserId, onEdit, onDelete }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="post-item">
            <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
            </Link>
            <p>{post.body}</p>
            <div className="post-meta">
                <span>
                    {t("user_id")}: {post.userId}
                </span>
                <span>
                    {t("post_id")}: {post.id}
                </span>
            </div>
            {currentUserId === post.userId && (
                <>
                    <button onClick={() => onEdit(post)}>{t("edit")}</button>
                    <button onClick={() => onDelete(post.id)}>
                        {t("delete")}
                    </button>
                </>
            )}
        </div>
    );
};

export default PostItem;