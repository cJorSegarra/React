import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/auth/authSlice";
import "./header.scss";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.auth.name);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="header">
            <nav>
                <ul>
                    <li>
                        <Link to="/">{t("home")}</Link>
                    </li>
                    <li>
                        <Link to="/posts">{t("posts")}</Link>
                    </li>
                    <li>
                        <Link to="/charts">{t("charts")}</Link>
                    </li>
                </ul>
                {username ? (
                    <ul className="user-section">
                        <li>
                            <span>{username}</span>
                        </li>
                        <li>
                            <button onClick={handleLogout}>
                                {t("logout")}
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="user-section">
                        <li>
                            <Link to="/login">{t("login")}</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Header;
