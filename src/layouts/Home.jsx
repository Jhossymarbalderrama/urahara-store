import React from "react";
import { Productos } from "../components/Productos";

export function Home({ agregarCarrito }) {
    return (
        <div>
            {/* <Banners /> */}
            <Productos agregarCarrito={agregarCarrito} />
        </div>
    )
}
