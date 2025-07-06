import React from "react";
import { Nav } from "../components/Nav";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import { Productos } from "../components/Productos";
import { Carrito } from "../components/Carrito";
import { Banners } from "../components/Banners"

export function Home({ agregarCarrito }) {
    return (
        <div>
            {/* <Banners /> */}
            <Productos agregarCarrito={agregarCarrito} />
        </div>
    )
}
