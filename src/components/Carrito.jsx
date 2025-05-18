import React from "react";
import "../styles/carrito.css";
import { Card } from "./Card";

export function Carrito({ productos }) {
    return (
        <div className="carrito-container">
            {productos.length > 0 ? (
                productos.map((pd, idx) => (
                    <Card key={idx} producto={pd} fAddCarrito={() => { }} />
                ))
            ) : (
                <p>Carrito Vacío</p>
            )}
        </div>
    );
}