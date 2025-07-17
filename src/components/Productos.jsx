import { Card } from "./Card";
import { Carrito } from "./Carrito";
import "../styles/productos.css";
import "../styles/spinner.css"
import { useProductosContext } from "../contexts/ProductosContext";
import { useState, useEffect } from "react";

export function Productos({ agregarCarrito }) {
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    try {
        const contextValue = useProductosContext();
        const {
            productosPaginados,
            productsNavigatePrev,
            productsNavigateNext,
            irAPagina,
            paginaActual,
            totalPaginas,
            cargando,
            error
        } = contextValue;

        const Navegacion = () => (
            <div className="navegacion-container">
                <div className="navegacion-buttons">
                    <button
                        className="btn-pagination"
                        onClick={productsNavigatePrev}
                        disabled={paginaActual === 1}
                        aria-label="Página anterior"
                    >
                        <i className="fas fa-chevron-left"></i>
                        {screenSize > 480 && <span className="btn-text">Anterior</span>}
                    </button>

                    <div className="pagination-numbers">
                        {generarNumerosPagina().map(numeroPagina => (
                            <button
                                key={numeroPagina}
                                onClick={() => irAPagina(numeroPagina)}
                                className={`btn-numero-pagina ${numeroPagina === paginaActual ? 'activo' : ''}`}
                                aria-label={`Ir a página ${numeroPagina}`}
                                aria-current={numeroPagina === paginaActual ? 'page' : undefined}
                            >
                                {numeroPagina}
                            </button>
                        ))}
                    </div>

                    <button
                        className="btn-pagination"
                        onClick={productsNavigateNext}
                        disabled={paginaActual === totalPaginas}
                        aria-label="Página siguiente"
                    >
                        {screenSize > 480 && <span className="btn-text">Siguiente</span>}
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        );

        const generarNumerosPagina = () => {
            const paginas = [];
            let rango = 2;

            if (screenSize <= 360) {
                rango = 0;
            } else if (screenSize <= 480) {
                rango = 1;
            } else if (screenSize <= 768) {
                rango = 1;
            }

            let inicio = Math.max(1, paginaActual - rango);
            let fin = Math.min(totalPaginas, paginaActual + rango);

            if (screenSize <= 360) {
                if (paginaActual > 1) paginas.push(paginaActual - 1);
                paginas.push(paginaActual);
                if (paginaActual < totalPaginas) paginas.push(paginaActual + 1);
                return paginas;
            }

            if (paginaActual <= rango) {
                fin = Math.min(totalPaginas, rango * 2 + 1);
            }
            if (paginaActual > totalPaginas - rango) {
                inicio = Math.max(1, totalPaginas - rango * 2);
            }

            if (screenSize <= 480) {
                const maxPaginas = 3;
                const totalPaginasAMostrar = fin - inicio + 1;
                if (totalPaginasAMostrar > maxPaginas) {
                    const mitad = Math.floor(maxPaginas / 2);
                    inicio = Math.max(1, paginaActual - mitad);
                    fin = Math.min(totalPaginas, inicio + maxPaginas - 1);
                }
            }

            for (let i = inicio; i <= fin; i++) {
                paginas.push(i);
            }

            return paginas;
        };

        if (cargando) {
            return (
                <div className="loading-container">
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Cargando productos...</span>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="error-message">
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>No se pudo cargar los productos. Por favor, inténtalo de nuevo.</p>
                </div>
            );
        }

        return (
            <div className="productos-page">
                <Navegacion />

                <div className="products-container">
                    {productosPaginados.map((pd, index) => (
                        <Card
                            key={`${pd.id}-${index}`}
                            producto={pd}
                            agregarCarrito={agregarCarrito}
                        />
                    ))}
                </div>

                {productosPaginados.length === 0 && !cargando && (
                    <div className="empty-products">
                        <i className="fas fa-box-open"></i>
                        <h3>No hay productos disponibles</h3>
                        <p>No se encontraron productos en esta página.</p>
                    </div>
                )}

                {totalPaginas > 1 && <Navegacion />}
            </div>
        );
    } catch (error) {
        console.error("Error in Productos:", error);
        return (
            <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                <p>Error: {error.message}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="btn-pagination"
                >
                    Recargar página
                </button>
            </div>
        );
    }
}