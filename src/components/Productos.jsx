import { Card } from "./Card";
import { Carrito } from "./Carrito";
import "../styles/productos.css";
import "../styles/spinner.css"
import { useProductosContext } from "../contexts/ProductosContext";

export function Productos({ agregarCarrito }) {
    try {
        const contextValue = useProductosContext();
        const {
            productos,
            productsNavigatePrev,
            productsNavigateNext,
            cargando,
            error,
            setApiPage
        } = contextValue;

        const Navegacion = () => (
            <div className="w-100 d-flex flex-row justify-content-center mt-4 gap-5">
                <button className="btn-pagination" onClick={productsNavigatePrev}>
                    <i className="fas fa-chevron-left me-2"></i>
                    Anterior
                </button>
                <button className="btn-pagination" onClick={() => setApiPage(1)}>
                    <i className="fas fa-home me-2"></i>
                    Inicio
                </button>
                <button className="btn-pagination" onClick={productsNavigateNext}>
                    Siguiente
                    <i className="fas fa-chevron-right ms-2"></i>
                </button>
            </div>
        );

        if (cargando) {
            return (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            );
        } else if (error) {
            return <p>No se pudo cargar los productos.</p>
        } else {
            return (
                <div>
                    <Navegacion />
                    <div className="products-container">
                        {productos.map((pd) => (
                            <Card key={pd.id} producto={pd} agregarCarrito={agregarCarrito} />
                        ))}
                    </div>
                    <Navegacion />
                </div>
            )
        }
    } catch (error) {
        console.error("Error in Productos:", error);
        return <div>Error: {error.message}</div>;
    }
}