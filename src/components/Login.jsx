import React from "react";

export function Login({ loginUser, loginAdmin, userLogin, adminLogin }) {
    return (
        <div className="d-flex flex-column justify-content-center aling-items-center" style={{ width: "100vw", minHeight: "300px" }}>
            <div className="flex-column justify-content-center aling-items-center">
                <button style={{ minWidth: "120px", minHeight: "30px", width: "180px", marginRight: "15px" }} onClick={loginUser}>
                    {!userLogin ? "Login Usuario" : "Deslogear Usuario"}
                </button>
                <button style={{ minWidth: "120px", minHeight: "30px", width: "180px" }} onClick={loginAdmin}>
                    {!adminLogin ? "Login Admin" : "Deslogear Admin"}
                </button>
            </div>
        </div>
    )
}