import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home-page/home-page";
import PostsPage from "../pages/post-page/posts-page";
import PostDetailPage from "../pages/post-detail-page/post-detail-page";
import LoginPage from "../pages/login-page/login-page";
import ChartPage from "../pages/chart-page/chart-page";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:postId" element={<PostDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/charts" element={<ChartPage />} />
        </Routes>
    );
};

export default AppRoutes;
