import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PopoverProps {
    content: React.ReactNode;
    anchorRef: React.RefObject<HTMLElement>;  // Reference to the clickable element
    isOpen: boolean;                          // Controls when to show the popover
    onClose: () => void;                      // Function to close the popover
    containerStyles?: React.CSSProperties;    // Custom styles for the popover
    backdropStyles?: React.CSSProperties;     // Custom styles for the background overlay
    hasShadow?: boolean;                      // If true, the popover will have a shadow
}

const Popover: React.FC<PopoverProps> = ({
    content,
    anchorRef,
    isOpen,
    onClose,
    containerStyles = {},  // Default is an empty object
    backdropStyles = {},   // Default is an empty object
    hasShadow = true       // Default value is true, meaning the popover will have a shadow
}) => {
    const [popoverPosition, setPopoverPosition] = useState<{ top: number; right: number } | null>(null);
    const [isVisible, setIsVisible] = useState(false);  // For handling animation

    // Detecta la tecla Escape para cerrar el Popover
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    // Establecer la posición cuando el popover se abre
    useEffect(() => {
        if (isOpen && anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setPopoverPosition({
                top: rect.bottom + 10,  // Añadir 10px de margen debajo del botón
                right: window.innerWidth - rect.right,  // Alinear el popover a la derecha, como el botón
            });
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isOpen, anchorRef]);

    if (!isOpen || !popoverPosition) return null;

    return ReactDOM.createPortal(
        <>
            {/* Fondo transparente que ocupa toda la pantalla */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',  // Fondo semitransparente por defecto
                    zIndex: 999,  // Debajo del popover
                    ...backdropStyles  // Sobrescribir estilos del fondo si se pasan
                }}
            />
            {/* Popover */}
            <div
                style={{
                    position: 'absolute',
                    top: popoverPosition.top,
                    right: popoverPosition.right,  // Alineado al mismo valor de right que el botón
                    zIndex: 1000,
                    background: '#fff',
                    borderRadius: 10,
                    boxSizing: "border-box",
                    padding: '10px',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(-10px)', // Animación de entrada/salida
                    boxShadow: hasShadow ? "0px 4px 12px rgba(0, 0, 0, 0.15)" : "none", // Añadir sombra si hasShadow es true
                    ...containerStyles  // Sobrescribir estilos del popover si se pasan
                }}
            >
                {content}
            </div>
        </>,
        document.body
    );
};

export default Popover;
