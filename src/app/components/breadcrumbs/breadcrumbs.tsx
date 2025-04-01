import { Link, useLocation } from "react-router-dom";
import "./breadcrumbs.scss";

const Breadcrumbs = () => {
    const location = useLocation();

    const pathnames = location.pathname.split("/").filter(Boolean);

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {}
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>

                {pathnames.map((segmento, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                    let label = segmento;
                    if (segmento === "posts") label = "Posts";

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
