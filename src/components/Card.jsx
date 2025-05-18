import React, { useState } from "react";
import "../styles/productos.css";

export function Card({ producto, fAddCarrito }) {
    const [cantidad, setCantidad] = useState(0);

    function sumCont() {
        setCantidad(cantidad + 1)
    }

    function restCont() {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

    return (
        <div className="product-card">
            <h1>{producto.name}</h1>
            <p>Tags: {producto.category}</p>
            <p>Descripcion: {producto.description}</p>
            <p>Precio: ${producto.price}</p>
            <div>
                <button onClick={restCont}>-</button>
                <span style={{ margin: "0 10px", color: "black" }}>{cantidad}</span>
                <button onClick={sumCont}>+</button>
            </div>
            <img className="product-image" src={producto.image}></img>
            <button onClick={() => fAddCarrito(producto, cantidad)}>Agregar al carrito</button>
        </div >
    )
}