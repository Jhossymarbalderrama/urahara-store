import React from "react";
import "../styles/carrito.css";
import { Card } from "./Card";


export function Carrito({ productos, quitarCarrito }) {
    const total = productos.reduce((acc, prod) => acc + Number(prod.price || 0), 0);

    return (
        <div className="px-4 m-4 mt-4">
            {productos.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((pd, index) => (
                                <tr key={`${pd.id}-${index}`}>
                                    <td>{pd.id}</td>
                                    <td>
                                        <img
                                            src={pd.image}
                                            alt={pd.name}
                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td>{pd.name}</td>
                                    <td>{pd.category}</td>
                                    <td>{pd.description}</td>
                                    <td className="fw-bold" style={{ color: '#2ca360' }}>
                                        ${Number(pd.price).toFixed(2)}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => quitarCarrito(pd.id)}
                                            className="btn btn-link text-danger p-0"
                                            title="Eliminar"
                                        >
                                            <i className="fa fa-trash fa-lg"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="5" className="text-end fw-bold">
                                    Total:
                                </td>
                                <td className="fw-bold" style={{ color: '#2ca360' }}>
                                    ${total.toFixed(2)}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <p className="text-center text-muted">Carrito Vacío</p>
            )
            }
        </div >
    );
}