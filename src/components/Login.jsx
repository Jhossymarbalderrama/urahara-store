/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/login.css";
import { crearUsuario, loginEmailPass } from "../auth/firebase";

export function Login() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const { login, logout, isLogin } = useAuthContext();
    const navigate = useNavigate();
    const [toRegister, setToRegister] = useState(false);

    const viewFormRegister = () => {
        toRegister ? setToRegister(!toRegister) : setToRegister(!toRegister);
    }

    const registrarUsuario = (e) => {
        e.preventDefault();
        crearUsuario(usuario, password);
        login(usuario);
    }

    const iniciarSesionEmailPass = (e) => {
        e.preventDefault();
        loginEmailPass(usuario, password).then((user) => {
            login(usuario);
            navigate('/');
        }).catch((error) => {
            alert("Error", error);
        });
    }


    if (!toRegister && !isLogin()) {
        return (
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <div className="icon">
                            <i className="fas fa-user-circle"></i>
                        </div>
                        <h2>Iniciar Sesión</h2>
                    </div>

                    <div className="login-form">
                        <form onSubmit={iniciarSesionEmailPass}>
                            <div className="form-group">
                                <label className="form-label">Usuario:</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        placeholder="Ingrese su usuario"
                                        required
                                    />
                                    <i className="fas fa-user input-icon"></i>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Contraseña:</label>
                                <div className="input-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Ingrese su contraseña"
                                        required
                                    />
                                    <i className="fas fa-lock input-icon"></i>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-login">
                                <i className="fas fa-sign-in-alt me-2"></i>
                                Iniciar Sesión
                            </button>
                        </form>

                        <div className="forgot-password">
                            <button className="btn" onClick={() => viewFormRegister()}>
                                Registrarse
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (toRegister) {
        return (
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <div className="icon">
                            <i className="fas fa-user-circle"></i>
                        </div>
                        <h2>Registrarse</h2>
                    </div>

                    <div className="login-form">
                        <form onSubmit={registrarUsuario}>
                            <div className="form-group">
                                <label className="form-label">Usuario:</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        placeholder="Ingrese su usuario"
                                        required
                                    />
                                    <i className="fas fa-user input-icon"></i>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Contraseña:</label>
                                <div className="input-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Ingrese su contraseña"
                                        required
                                    />
                                    <i className="fas fa-lock input-icon"></i>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-login">
                                <i className="fas fa-user-plus me-2"></i>
                                Registrarse
                            </button>
                        </form>

                        <div className="forgot-password">
                            <button className="btn" onClick={() => viewFormRegister()}>
                                Ya tengo cuenta - Iniciar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        )
    } else if (isLogin()) {
        return (
            <div className="login-container">


                <button type="button" className="logout-btn" onClick={() => logout()}>
                    <i className="fas fa-sign-out-alt"></i>
                    Cerrar Sesión
                </button>
            </div>
        );
    }

}