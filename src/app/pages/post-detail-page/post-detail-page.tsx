import { useParams, useNavigate } from "react-router-dom";
import { useGetPostByIdQuery } from "../../api/postApiSlice";
import {
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useCreateCommentMutation,
} from "../../api/commentApiSlice";
import { Comment as CommentType, NewComment } from "../../types/comment.type";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CommentItem from "../../components/comment-item/comment-item";
import EditCommentForm from "../../components/edit-comment-form/edit-comment-form";
import CreateCommentForm from "../../components/create-comment-form/create-comment-form";
import { useTranslation } from "react-i18next";
import "./post-detail-page.scss";

const PostDetailPage = () => {
    const { t } = useTranslation();
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();

    const {
        data: post,
        error,
        isLoading,
        refetch,
    } = useGetPostByIdQuery(Number(postId));

    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const [createComment] = useCreateCommentMutation();

    const [editingComment, setEditingComment] = useState<CommentType | null>(
        null
    );
    const [isAddingComment, setIsAddingComment] = useState<boolean>(false);

    const currentUserId = useSelector((state: RootState) => state.auth.id);

    const handleEditComment = (comment: CommentType) => {
        setEditingComment(comment);
    };

    const handleDeleteComment = async (commentId: number) => {
        if (window.confirm(t("confirm_delete_comment"))) {
            await deleteComment(commentId);
            refetch();
        }
    };

    const handleSaveComment = async (comment: CommentType) => {
        await updateComment({ id: comment.id, comment });
        setEditingComment(null);
        refetch();
    };

    const handleSaveNewComment = async (newComment: NewComment) => {
        await createComment(newComment);
        setIsAddingComment(false);
        refetch();
    };

    if (isLoading) {
        return <div>{t("loading")}</div>;
    }

    if (error) {
        return <div>{t("error_loading_post")}</div>;
    }

    if (!post) {
        return <div>{t("post_not_found")}</div>;
    }

    return (
        <div className="post-detail">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← {t("back")}
            </button>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <div className="post-meta">
                <span>
                    {t("user_id")}: {post.userId}
                </span>
                <span>
                    {t("post_id")}: {post.id}
                </span>
            </div>

            {currentUserId ? (
                !isAddingComment && (
                    <button
                        className="add-comment-button"
                        onClick={() => setIsAddingComment(true)}
                    >
                        {t("comment_action")}
                    </button>
                )
            ) : (
                <p>{t("please_log_in_to_comment")}</p>
            )}

            {isAddingComment && currentUserId && (
                <CreateCommentForm
                    postId={post.id}
                    onSave={handleSaveNewComment}
                    onCancel={() => setIsAddingComment(false)}
                />
            )}

            <div className="comments">
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            currentUserId={currentUserId}
                            onEdit={handleEditComment}
                            onDelete={handleDeleteComment}
                        />
                    ))
                ) : (
                    <p>{t("no_comments_available")}</p>
                )}
            </div>

            {editingComment && (
                <EditCommentForm
                    comment={editingComment}
                    onSave={handleSaveComment}
                    onCancel={() => setEditingComment(null)}
                />
            )}
        </div>
    );
};

export default PostDetailPage;
