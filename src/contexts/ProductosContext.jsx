/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import { initSweet } from '../assets/SweetAlert'
import productJSON from '../data/products.json';

export const ProductosContext = createContext();

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [apiPage, setApiPage] = useState(1);


    const [paginacion, setPaginacion] = useState({
        paginaActual: 1,
        productosPorPagina: 24
    });

    useEffect(() => {
        setCargando(true);
        setError(null);

        const timeoutId = setTimeout(() => {
            setCargando(false);
        }, 1000);

        fetch(`https://api.jikan.moe/v4/manga?limit=24&page=${apiPage}`)
            .then((res) => res.json())
            .then((json) => {
                const mappedProductosAPI = json.data.map((d) => ({
                    id: d.mal_id,
                    name: d.title,
                    category: d.demographics?.[0]?.name || "Sin categoría",
                    price: (Math.random() * 150).toFixed(2),
                    description: d.background?.slice(0, 250) + "..." || "Sin descripción disponible",
                    image: d.images?.webp?.large_image_url || ""
                }));

                // 1º Traigo la información del JSON
                const jsonProducts = getJsonDataProducts();

                console.log("\n" + "=".repeat(80));
                console.log(`🚀 INFORMACION DE JSON`);
                console.log("📋 Cantidad Productos: ", jsonProducts.length);
                console.log("=".repeat(80));

                // 2ª Unifico los datos del JSON con los de la API 
                const mergedProducts = fusionUpdateProducts(jsonProducts, mappedProductosAPI);

                console.log("\n" + "=".repeat(80));
                console.log("📝 DATOS API MANGA");
                console.log("📋 Cantidad Productos API: ", mappedProductosAPI.length);
                console.log("📋 Cantidad Productos JSON: ", jsonProducts.length);
                console.log("📋 Cantidad Productos Fusion: ", mergedProducts.length);
                console.log("=".repeat(80));

                // 3ª Unifico los datos guardados en el LOCALSTORAGE
                const finalProducts = getLocalStorageProducts(mergedProducts);

                console.log("\n" + "=".repeat(80));
                console.log("📝 PRODUCTOS EN LISTA FINAL");
                console.log("📋 Cantidad Productos: ", finalProducts.length);
                console.log("=".repeat(80));

                // Filtro Ordenamiento byID
                finalProducts.sort((a, b) => b.id - a.id);

                setProductos(finalProducts);
                setCargando(false);
            })
            .catch((error) => {
                console.error("Error al cargar productos:", error);
                setError('Error. No se pudo cargar los datos de la API');
                clearTimeout(timeoutId);
                setCargando(false);
            });

        return () => clearTimeout(timeoutId);
    }, [apiPage]);

    // Función para obtener productos de la página actual
    const getProductosPaginados = () => {
        const inicio = (paginacion.paginaActual - 1) * paginacion.productosPorPagina;
        const fin = inicio + paginacion.productosPorPagina;
        return productos.slice(inicio, fin);
    };

    // Calcular total de páginas
    const getTotalPaginas = () => {
        return Math.ceil(productos.length / paginacion.productosPorPagina);
    };

    // Funciones de navegación corregidas
    const productsNavigateNext = () => {
        const totalPaginas = getTotalPaginas();
        setPaginacion(prev => ({
            ...prev,
            paginaActual: prev.paginaActual < totalPaginas ? prev.paginaActual + 1 : prev.paginaActual
        }));
    };

    const productsNavigatePrev = () => {
        setPaginacion(prev => ({
            ...prev,
            paginaActual: prev.paginaActual > 1 ? prev.paginaActual - 1 : 1
        }));
    };

    // Función para ir a una página específica
    const irAPagina = (numeroPagina) => {
        const totalPaginas = getTotalPaginas();
        if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
            setPaginacion(prev => ({
                ...prev,
                paginaActual: numeroPagina
            }));
        }
    };

    // Función para cambiar productos por página
    const cambiarProductosPorPagina = (cantidad) => {
        setPaginacion(prev => ({
            paginaActual: 1, // Resetear a primera página
            productosPorPagina: cantidad
        }));
    };

    // Reset de paginación cuando cambian los productos
    useEffect(() => {
        if (productos.length > 0) {
            setPaginacion(prev => ({
                ...prev,
                paginaActual: 1
            }));
        }
    }, [productos.length]);

    const getJsonDataProducts = () => {
        if (productJSON !== null && productJSON.length > 0) {
            return productJSON;
        }
        return [];
    }

    const fusionUpdateProducts = (jsonProducts, mappedProductos) => {
        const jsonProductIds = new Set(jsonProducts.map(product => product.id));

        const uniqueApiProducts = mappedProductos.filter(apiProduct =>
            !jsonProductIds.has(apiProduct.id)
        );

        return [...jsonProducts, ...uniqueApiProducts];
    };

    const getLocalStorageProducts = (currentProducts) => {
        const productsLS = localStorage.getItem("products");

        if (productsLS !== null) {
            try {
                const parsedProducts = JSON.parse(productsLS);
                if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
                    const currentProductIds = new Set(currentProducts.map(p => p.id));
                    const uniqueStorageProducts = parsedProducts.filter(p =>
                        !currentProductIds.has(p.id)
                    );
                    return [...currentProducts, ...uniqueStorageProducts];
                }
            } catch (e) {
                console.error("Error parsing localStorage products:", e);
            }
        }

        localStorage.setItem("products", JSON.stringify(currentProducts));
        return currentProducts;
    };

    const agregarProducto = (producto) => {
        if (!producto || !producto.name) {
            console.error("Producto inválido");
            return;
        }

        const existePorNombre = productos.some(p =>
            p.name.toLowerCase() === producto.name.toLowerCase()
        );

        if (existePorNombre) {
            initSweet(
                "Manga ya existe",
                `El manga "${producto.name}" ya está en la lista`,
                "warning",
                "Aceptar"
            );
            return;
        }

        const nuevoProducto = {
            ...producto,
            id: getNextIdProduct()
        };

        setProductos(productos => {
            const productosActualizados = [...productos, nuevoProducto];
            productosActualizados.sort((a, b) => b.id - a.id);

            updateLocalStorage(productosActualizados);
            return productosActualizados;
        });

        initSweet(
            "Manga agregado a los Productos",
            `El manga "${producto.name}" se agregó correctamente con ID: ${nuevoProducto.id}`,
            "success",
            "Aceptar"
        );
    }

    const eliminarProducto = (id) => {
        const productoAEliminar = productos.find(p => p.id === id);

        if (!productoAEliminar) {
            initSweet(
                "Error",
                "No se encontró el producto a eliminar",
                "error",
                "Aceptar"
            );
            return;
        }

        setProductos(productos => {
            const productosActualizados = productos.filter(p => p.id !== id);
            updateLocalStorage(productosActualizados);
            return productosActualizados;
        });

        initSweet(
            "Producto eliminado",
            `El manga "${productoAEliminar.name}" fue eliminado correctamente`,
            "success",
            "Aceptar"
        );
    };

    const modificarProducto = (id, datosActualizados) => {
        const productoExiste = productos.some(p => p.id === id);

        if (!productoExiste) {
            initSweet(
                "Error",
                "No se encontró el producto a modificar",
                "error",
                "Aceptar"
            );
            return;
        }

        setProductos(productos => {
            const productosActualizados = productos.map(p =>
                p.id === id ? { ...p, ...datosActualizados } : p
            );
            updateLocalStorage(productosActualizados);
            return productosActualizados;
        });

        initSweet(
            "Producto modificado",
            "El manga fue actualizado correctamente",
            "success",
            "Aceptar"
        );
    };

    const getProductoById = (id) => {
        if (!id || !productos || productos.length === 0) {
            return null;
        }

        return productos.find(p => p.id === parseInt(id) || p.id === id) || null;
    }

    const getNextIdProduct = () => {
        if (!productos || productos.length === 0) {
            return 1;
        }

        const maxId = Math.max(...productos.map(p => p.id || 0));
        return maxId + 1;
    }

    const updateLocalStorage = (productosActualizados) => {
        localStorage.setItem("products", JSON.stringify(productosActualizados));
    };



    const productosPaginados = getProductosPaginados();
    const totalPaginas = getTotalPaginas();
    const totalProductos = productos.length;

    return (
        <ProductosContext.Provider value={{
            productos,
            productosPaginados,
            cargando,
            error,
            agregarProducto,
            eliminarProducto,
            modificarProducto,
            getProductoById,
            productsNavigateNext,
            productsNavigatePrev,
            irAPagina,
            cambiarProductosPorPagina,
            paginaActual: paginacion.paginaActual,
            productosPorPagina: paginacion.productosPorPagina,
            totalPaginas,
            totalProductos,
            apiPage,
            setApiPage
        }}>
            {children}
        </ProductosContext.Provider>
    );
}

export const useProductosContext = () => useContext(ProductosContext);