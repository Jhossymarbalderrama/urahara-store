import React from "react";
import "../styles/about.css"

export function About() {
    return (
        <section className="about-section">
            <div className="about-container">
                <h2 className="about-title">Sobre Nosotros</h2>
                <p className="about-text">
                    En <strong>Urahara Store</strong> somos fanáticos del mundo del anime, el manga y la cultura japonesa.
                    Nuestra tienda nace con la pasión de compartir esta cultura con todos los otakus, coleccionistas y lectores del mundo hispano.
                </p>
                <p className="about-text">
                    Ofrecemos una amplia variedad de <span>mangas</span>, <span>cómics</span>, <span>novelas ligeras</span>,
                    <span>merchandising exclusivo</span> y mucho más. Trabajamos día a día para traer productos originales y de calidad,
                    seleccionados especialmente para vos.
                </p>
                <p className="about-text">
                    Nuestra misión es ser tu tienda de confianza, donde cada visita sea como entrar al mundo de tus animes favoritos.
                    ¡Gracias por formar parte de esta comunidad!
                </p>
            </div>
        </section>
    );
}