/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/login.css";
import { crearUsuario, loginEmailPass } from "../auth/firebase";
import { initSweet } from '../assets/SweetAlert';

export function Login() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const { login, logout, isLogin } = useAuthContext();
    const navigate = useNavigate();
    const [toRegister, setToRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const viewFormRegister = () => {
        setToRegister(!toRegister);
        setUsuario('');
        setPassword('');
    }

    const registrarUsuario = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await crearUsuario(usuario, password);
            login(usuario);

            initSweet(
                "Cuenta creada exitosamente",
                `¡Bienvenido! Tu cuenta ha sido registrada correctamente`,
                "success",
                "Aceptar"
            );

            navigate('/');
        } catch (error) {
            let errorMessage = "Error desconocido";

            // Manejar diferentes tipos de errores de Firebase
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "Este email ya está registrado";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "El formato del email no es válido";
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = "El registro con email está deshabilitado";
                    break;
                case 'auth/weak-password':
                    errorMessage = "La contraseña es muy débil. Usa al menos 6 caracteres";
                    break;
                case 'auth/network-request-failed':
                    errorMessage = "Error de conexión. Verifica tu internet";
                    break;
                default:
                    errorMessage = error.message;
            }

            initSweet(
                "Error al registrar",
                errorMessage,
                "error",
                "Aceptar"
            );
        } finally {
            setIsLoading(false);
        }
    }

    const iniciarSesionEmailPass = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const user = await loginEmailPass(usuario, password);
            login(usuario);

            initSweet(
                "Inicio de sesión exitoso",
                `¡Bienvenido de vuelta!`,
                "success",
                "Aceptar"
            );

            navigate('/');
        } catch (error) {
            let errorMessage = "Error desconocido";

            // Manejar diferentes tipos de errores de Firebase
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = "No existe una cuenta con este email";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Contraseña incorrecta";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "El formato del email no es válido";
                    break;
                case 'auth/user-disabled':
                    errorMessage = "Esta cuenta ha sido deshabilitada";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Demasiados intentos fallidos. Intenta más tarde";
                    break;
                case 'auth/network-request-failed':
                    errorMessage = "Error de conexión. Verifica tu internet";
                    break;
                case 'auth/invalid-credential':
                    errorMessage = "Credenciales inválidas. Verifica tu email y contraseña";
                    break;
                default:
                    errorMessage = error.message;
            }

            initSweet(
                "Error al iniciar sesión",
                errorMessage,
                "error",
                "Aceptar"
            );
        } finally {
            setIsLoading(false);
        }
    }

    const handleLogout = () => {
        logout();

        initSweet(
            "Sesión cerrada",
            "Has cerrado sesión correctamente",
            "success",
            "Aceptar"
        );

        navigate('/');
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                        <p className="header-subtitle">Bienvenido de vuelta</p>
                    </div>

                    <div className="login-form">
                        <form onSubmit={iniciarSesionEmailPass}>
                            <div className="form-group">
                                <label className="form-label">Usuario</label>
                                <div className="input-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        placeholder="correo@ejemplo.com"
                                        required
                                        disabled={isLoading}
                                    />
                                    <i className="fas fa-user input-icon"></i>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Contraseña</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-login"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin me-2"></i>
                                        Iniciando...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-sign-in-alt me-2"></i>
                                        Iniciar Sesión
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="form-footer">
                            <p className="switch-text">¿No tienes cuenta?</p>
                            <button
                                className="btn btn-login"
                                onClick={viewFormRegister}
                                disabled={isLoading}
                            >
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
                    <div className="login-header register-header">
                        <div className="icon">
                            <i className="fas fa-user-plus"></i>
                        </div>
                        <h2>Crear Cuenta</h2>
                        <p className="header-subtitle">Únete a nosotros</p>
                    </div>

                    <div className="login-form">
                        <form onSubmit={registrarUsuario}>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <div className="input-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        placeholder="correo@ejemplo.com"
                                        required
                                        disabled={isLoading}
                                    />
                                    <i className="fas fa-envelope input-icon"></i>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Contraseña</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Mínimo 6 caracteres"
                                        required
                                        minLength={6}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                </div>
                                <div className="password-strength">
                                    <small className="password-hint">
                                        Usa al menos 6 caracteres para mayor seguridad
                                    </small>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-login register-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin me-2"></i>
                                        Creando cuenta...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-user-plus me-2"></i>
                                        Crear Cuenta
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="form-footer">
                            <p className="switch-text">¿Ya tienes cuenta?</p>
                            <button
                                className="btn btn-login"
                                onClick={viewFormRegister}
                                disabled={isLoading}
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (isLogin()) {
        return (
            <div className="login-container logged-in">
                <div className="logout-card">
                    <div className="logout-content">
                        <div className="user-info">
                            <h3>Sesión Activa</h3>
                        </div>

                        <div className="logout-actions">
                            <button
                                type="button"
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Cerrar Sesión</span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}