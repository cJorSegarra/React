import { Link, useLocation } from "react-router-dom";
import "./breadcrumbs.scss";
import { useTranslation } from "react-i18next";

const Breadcrumbs = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const pathnames = location.pathname.split("/").filter(Boolean);

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">{t("home")}</Link>
                </li>

                {pathnames.map((segmento, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                    let label = segmento;
                    if (segmento === "posts") label = t("posts");
                    if (segmento === "charts") label = t("charts");

                    return (
                        <li key={to} className="breadcrumb-item">
                            <Link to={to}>{label}</Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
