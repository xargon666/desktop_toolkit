import { useState, useEffect } from "react";
import './window.css'

interface WindowProps {
    children: any;
    name: string;
    windowId: string;
}

const Window = ({ children, name, windowId }: WindowProps) => {
    const pos0 = { x: 0, y: 0 };
    const defaultWindowSize = { width: 300, height: 300 };
    const [windowPosition, setWindowPosition] = useState({ x: 300, y: 50 });
    const [windowDimensions, setWindowDimensions] = useState(defaultWindowSize);
    const initialWindowStyle: any = {
        position: "absolute",
        width: `${windowDimensions.width}px`,
        height: `${windowDimensions.height}px`,
        top: `${windowPosition.y}px`,
        left: `${windowPosition.x}px`,
        userSelect: "none",
    };

    const initialWindowTitleStyle: any = {
        background: "DarkGreen",
        fontWeight: "500",
        color: "white",
    };

    const [windowStyle, setWindowStyle] = useState(initialWindowStyle);
    const [windowTitleStyle, setWindowTitleStyle] = useState(
        initialWindowTitleStyle
    );
    const [activeStatus, setActiveStatus] = useState(false);
    const [windowTitleMousePosition, setWindowMousePosition] = useState(pos0);

    const handleMouseDown = () => {
        setWindowTitleStyle((prevStyle: {}) => ({
            ...prevStyle,
            background: "Green",
        }));
        setActiveStatus(true);
    };

    const handleMouseUp = () => {
        setWindowTitleStyle((prevStyle: {}) => ({
            ...prevStyle,
            background: "DarkGreen",
        }));
        setActiveStatus(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (activeStatus) {
            let newPos = {
                x: e.clientX - windowTitleMousePosition.x,
                y: e.clientY - windowTitleMousePosition.y,
            };
            // right edge
            if (newPos.x + windowDimensions.width >= window.innerWidth) {
                newPos.x = window.innerWidth - windowDimensions.width;
            }
            // left edge
            if (newPos.x <= 0) {
                newPos.x = 0;
            }
            // top edge
            if (newPos.y <= 0) {
                newPos.y = 0;
            }
            // bottom edge
            if (newPos.y + windowDimensions.height >= window.innerHeight) {
                newPos.y = window.innerHeight - windowDimensions.height;
            }
            setWindowPosition(newPos);
            setWindowStyle((prevStyle: {}) => ({
                ...prevStyle,
                top: `${newPos.y}px`,
                left: `${newPos.x}px`,
            }));
        }
    };

    const handleWindowMouseMove = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const div = document.getElementById(windowId);
        if (div) {
            const rect = div.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setWindowMousePosition({ x, y });
        }
    };

    useEffect(() => {
        if (activeStatus) {
            window.addEventListener("mousemove", handleMouseMove);
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }
    }, [activeStatus]);

    return (
        <div style={windowStyle} id={windowId} className="window">
            <div className='title-bar-container'>
                <div
                    className="title-bar"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleWindowMouseMove}
                    style={windowTitleStyle}
                >
                    {name}
                </div>
                <div className='exit-window'>X</div>
            </div>
            <div className="content-area">
                <p className="window-data">
                    titleBarMosPos x: {windowTitleMousePosition.x} y:{" "}
                    {windowTitleMousePosition.y}
                </p>
                <p className="window-data">
                    winPos x: {windowPosition.x} y: {windowPosition.y}
                </p>
                {children}
            </div>
        </div>
    );
};

export default Window;
