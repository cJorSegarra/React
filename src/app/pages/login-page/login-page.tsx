import LoginComponent from "../../components/login-component/login-component";
import { useTranslation } from "react-i18next";

function LoginPage() {
    const { t } = useTranslation();

    return (
        <div className="login-page">
            <h1>{t("log_in")}</h1>
            <LoginComponent />
        </div>
    );
}

export default LoginPage;
