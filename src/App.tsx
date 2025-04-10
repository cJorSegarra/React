import Layout from "./app/pages/layout/layout";
import AppRoutes from "./app/routes/app-routes";
import "./index.css";

const App = () => {
    return (
        <Layout>
            <AppRoutes />
        </Layout>
    );
};

export default App;
