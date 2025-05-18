import React from 'react';
import { useEffect, useState } from 'react';
import "../../styles/scrollToTopButton.css"

export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 50);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="scroll-to-top"
                aria-label="Ir arriba"
            >
                <i className="fas fa-arrow-up"></i>
            </button>
        )
    );
}
