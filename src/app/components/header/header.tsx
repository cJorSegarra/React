import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/auth/authSlice";
import "./header.scss";

const Header = () => {
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
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/posts">Posts</Link>
                    </li>
                </ul>
                {username ? (
                    <ul className="user-section">
                        <li>
                            <span>{username}</span>
                        </li>
                        <li>
                            <button onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="user-section">
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Header;
