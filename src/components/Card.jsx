import React, { useState } from "react";
import "../styles/productos.css";

export function Card({ producto, agregarCarrito }) {
    const [cantidad, setCantidad] = useState(1);

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
            <img className="product-image" src={producto.image}></img>

            <p>{producto.name}</p>
            {/* <p>Tags: {producto.category}</p> */}
            {/* <p>Descripcion: {producto.description}</p> */}
            <p className="product-price">${producto.price} <span className="discount">10% comprando 1 o más</span></p>

            <div className="select-cant">
                <button onClick={restCont}>-</button>
                <span style={{ margin: "0 10px", color: "black" }}>{cantidad}</span>
                <button onClick={sumCont}>+</button>
            </div>
            <button className="btn-addCart" onClick={() => agregarCarrito(producto, cantidad)}>Agregar al carrito</button>
        </div >
    )
}