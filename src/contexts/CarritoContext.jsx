import React, { createContext, useState, useEffect } from "react";
import { initSweet } from '../assets/SweetAlert'

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [productsCarrito, setProductsCarrito] = useState([]);
    const [carritoIniciado, setCarritoIniciado] = useState(false);


    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito");

        if (carritoGuardado) {
            try {
                const carritoParseado = JSON.parse(carritoGuardado);
                if (Array.isArray(carritoParseado)) {
                    setProductsCarrito(carritoParseado);
                }
            } catch (error) {
                console.error("Error al cargar carrito desde localStorage:", error);
                localStorage.removeItem("carrito");
            }
        }
        setCarritoIniciado(true);
    }, []);


    useEffect(() => {
        if (carritoIniciado) {
            localStorage.setItem("carrito", JSON.stringify(productsCarrito));
        }
    }, [productsCarrito, carritoIniciado]);

    const agregarAlCarrito = (producto, cantidad) => {
        setProductsCarrito(productos => [
            ...productos,
            ...Array(cantidad).fill(producto)
        ]);

        initSweet(
            "Manga agregado al carrito",
            `El manga de ${producto.name} se agregó al carrito (${cantidad} unidades)`,
            "success",
            "Aceptar"
        );
    };

    const quitarCarrito = (idProducto) => {
        const listAux = [...productsCarrito];
        const index = listAux.findIndex((pd) => pd.id === idProducto);

        if (index !== -1) {
            const [manga] = listAux.splice(index, 1);

            setProductsCarrito(listAux);

            initSweet(
                "Manga eliminado del carrito",
                `El manga de ${manga.name} se quitó del carrito`,
                "success",
                "Aceptar"
            );
        }
    }

    const vaciarCarrito = () => {
        setProductsCarrito([]);
    };

    return (
        <CarritoContext.Provider value={{ productsCarrito, agregarAlCarrito, vaciarCarrito, quitarCarrito }} >
            {children}
        </CarritoContext.Provider >
    );
}