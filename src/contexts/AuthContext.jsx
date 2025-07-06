/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { initSweet } from '../assets/SweetAlert'

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setUser(token);
        }
    }, []);

    const login = (username, isAdm) => {
        const token = `fake-token-${username}`;

        if (isAdm) {
            setUser(token + '!ADM');
            localStorage.setItem('authToken', token + '!ADM');
        } else {
            setUser(token);
            localStorage.setItem('authToken', token);
        }

        messageAlert("Usuario logeado", "", "success", "Aceptar");
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        messageAlert("Usuario deslogeado", "", "success", "Aceptar")
    };

    const isLogin = () => {
        const token = localStorage.getItem("authToken");
        return token !== null;
    };

    const checkAuthStatus = () => {
        const token = localStorage.getItem("authToken");
        if (token && !user) {
            setUser(token);
        }
        return token !== null;
    };

    function messageAlert(title, message, type, textBtn) {
        initSweet(
            title,
            message,
            type,
            textBtn
        );
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isLogin,
            checkAuthStatus
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);