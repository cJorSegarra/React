import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home.page/home-page";
import PostsPage from "../pages/post-page/posts-page";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostsPage />} />
        </Routes>
    );
};

export default AppRoutes;
