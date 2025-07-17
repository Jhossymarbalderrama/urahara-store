import React from "react";
import "../styles/contact.css";

export function Contact() {
    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Contacto</h1>
                <p>Encuentra toda la información necesaria para ponerte en contacto con nosotros</p>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="info-card">
                        <div className="info-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="info-content">
                            <h3>Dirección</h3>
                            <p>Av. Corrientes 1234<br />C1043 Buenos Aires, Argentina</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="info-content">
                            <h3>Teléfono</h3>
                            <p>+54 11 1234-5678</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="info-content">
                            <h3>Email</h3>
                            <p>contacto@empresa.com</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                <polyline points="12,6 12,12 16,14" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <div className="info-content">
                            <h3>Horarios</h3>
                            <p>Lunes a Viernes: 9:00 - 18:00<br />Sábados: 9:00 - 13:00</p>
                        </div>
                    </div>
                </div>

                <div className="map-container">
                    <div className="map-wrapper">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168882824894!2d-58.38414892476287!3d-34.60373737295687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacb9f8ff113%3A0x22fd08da5c4344b7!2sAv.%20Corrientes%201234%2C%20C1043%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2sar!4v1689123456789!5m2!1ses!2sar"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación de la empresa"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Contact;