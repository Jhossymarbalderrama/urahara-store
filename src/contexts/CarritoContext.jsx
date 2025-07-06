import React, { createContext, useState } from "react";
import { initSweet } from '../assets/SweetAlert'

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [productsCarrito, setProductsCarrito] = useState([]);

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