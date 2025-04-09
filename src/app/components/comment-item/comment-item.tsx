import { Comment } from "../../types/comment.type";
import "./comment-item.scss";
import { useTranslation } from "react-i18next";

interface CommentItemProps {
    comment: Comment;
    currentUserId: number | null;
    onEdit: (comment: Comment) => void;
    onDelete: (commentId: number) => void;
}

const CommentItem = ({
    comment,
    currentUserId,
    onEdit,
    onDelete,
}: CommentItemProps) => {
    const { t } = useTranslation();

    return (
        <div className="comment-item">
            <p>{comment.body}</p>
            <span>
                {t("comment_by_user_id")}: {comment.userId}
            </span>
            {currentUserId === comment.userId && (
                <>
                    <button onClick={() => onEdit(comment)}>{t("edit")}</button>
                    <button onClick={() => onDelete(comment.id)}>
                        {t("delete")}
                    </button>
                </>
            )}
        </div>
    );
};

export default CommentItem;
