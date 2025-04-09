import { useEffect } from "react";
import { useGetPostsQuery } from "../../api/postApiSlice";
import { useGetCommentsQuery } from "../../api/commentApiSlice";
import BarChart from "../../components/barchart-component/barchart-component";
import { Post } from "../../types/post.type";
import { Comment } from "../../types/comment.type";
import { useTranslation } from "react-i18next";

interface ChartDataItem {
    name: string;
    posts: number;
    comments: number;
}

const ChartPage = () => {
    const { t } = useTranslation();
    const {
        data: posts,
        isLoading: loadingPosts,
        error: postsError,
        refetch: refetchPosts,
    } = useGetPostsQuery();
    const {
        data: comments,
        isLoading: loadingComments,
        error: commentsError,
        refetch: refetchComments,
    } = useGetCommentsQuery();

    useEffect(() => {
        refetchPosts();
        refetchComments();
    }, [refetchPosts, refetchComments]);

    if (loadingPosts || loadingComments) {
        return <div>{t("loading")}</div>;
    }

    if (postsError || commentsError) {
        return <div>{t("error_loading_data")}</div>;
    }

    const chartDataMap: { [key: string]: ChartDataItem } = {};

    posts?.forEach((post: Post) => {
        const userId = post.userId.toString();
        if (!chartDataMap[userId]) {
            chartDataMap[userId] = {
                name: `${t("user")} ${userId}`,
                posts: 0,
                comments: 0,
            };
        }
        chartDataMap[userId].posts += 1;
    });

    comments?.forEach((comment: Comment) => {
        const userId = comment.userId.toString();
        if (!chartDataMap[userId]) {
            chartDataMap[userId] = {
                name: `${t("user")} ${userId}`,
                posts: 0,
                comments: 0,
            };
        }
        chartDataMap[userId].comments += 1;
    });

    const chartData: ChartDataItem[] = Object.values(chartDataMap);

    return (
        <div>
            <h1>{t("quantity_of_posts_and_comments_per_user")}</h1>
            <BarChart data={chartData} />
        </div>
    );
};

export default ChartPage;
