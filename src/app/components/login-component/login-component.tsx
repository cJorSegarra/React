import React, { useState } from "react";
import { useLoginMutation } from "../../api/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authSlice";
import { useTranslation } from "react-i18next";
import "./login-component.scss";

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loginMutation, { isLoading, isError, error }] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData = await loginMutation({ name, password }).unwrap();
            dispatch(login({ id: userData.id, name: userData.name }));
            navigate("/posts");
        } catch (err) {
            console.error(t("error_login"), err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>{t("name")}:</label>
                    <input
                        data-cy-test="username"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>{t("password")}:</label>
                    <input
                        data-cy-test="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? t("loading") : t("sign_in")}
                </button>
            </form>
            {isError && (
                <p style={{ color: "red" }}>
                    {t("error_login")}: {error && t("invalid_credentials")}
                </p>
            )}
        </div>
    );
};

export default Login;
