import React, { useState } from "react";
import { useLoginMutation } from "../../api/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loginMutation, { isLoading, isError, error }] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userData = await loginMutation({ name, password }).unwrap();
            dispatch(login({ id: userData.id, name: userData.name }));
            navigate("/posts");
        } catch (err) {
            console.error("Error en el login:", err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Iniciar Sesión"}
                </button>
            </form>
            {isError && (
                <p style={{ color: "red" }}>
                    Error en el login: {error && "Credenciales inválidas"}
                </p>
            )}
        </div>
    );
};

export default Login;
