import { useState, useEffect } from "react";
import "./window.css";

interface WindowProps {
    children: any;
    name: string;
    windowId: string;
    handleClickClose: any;
    defaultWidth: number;
    defaultHeight: number;
}

const Window = ({
    children,
    name,
    windowId,
    handleClickClose,
    defaultWidth,
    defaultHeight,
}: WindowProps) => {
    const defaultWindowSize = { width: defaultWidth, height: defaultHeight };

    // Set Random Window Starting Position
    const randX = Math.random() * (window.innerWidth / 2);
    const randY = Math.random() * (window.innerHeight / 2);
    const [windowPosition, setWindowPosition] = useState({
        x: randX,
        y: randY,
    });

    const [windowDimensions, setWindowDimensions] = useState(defaultWindowSize);

    const initialWindowStyle: any = {
        width: `${windowDimensions.width}px`,
        height: `${windowDimensions.height}px`,
        top: `${windowPosition.y}px`,
        left: `${windowPosition.x}px`,
    };

    const titleGradient =
        "linear-gradient(0deg, rgba(0,59,0,1) 0%, rgba(0,110,0,1) 50%, rgba(0,148,0,1) 90%, rgba(0,186,0,1) 100%)";

    const titleGradientActive =
        "linear-gradient(0deg, rgba(0,83,29,1) 0%, rgba(0,133,16,1) 50%, rgba(0,180,53,1) 90%, rgba(0,210,48,1) 100%)";

    const initialWindowTitleStyle: any = {
        background: titleGradient,
    };

    const resizeButtonHeight = 17;
    const resizeButtonGradient =
        "linear-gradient(to bottom right,#d9ffd9 0%,#d9ffd9 50%,#005c00 50%,#005c00 100%)";
    const resizeButtonGradientActive =
        "linear-gradient(to bottom right,#d9ffd9 0%,#d9ffd9 50%,#009400 50%,#009400 100%)";

    const initialWindowResizeStyle: any = {
        height: `${resizeButtonHeight}px`,
        width: `${resizeButtonHeight}px`,
        background: resizeButtonGradient,
    };
    const POS_0 = { x: 0, y: 0 };
    const [windowStyle, setWindowStyle] = useState(initialWindowStyle);
    const [windowTitleStyle, setWindowTitleStyle] = useState(
        initialWindowTitleStyle
    );
    const [windowResizeStyle, setWindowResizeStyle] = useState(
        initialWindowResizeStyle
    );
    const [titleActiveStatus, setActiveStatus] = useState(false);
    const [resizeActiveStatus, setResizeActiveStatus] = useState(false);
    const [windowTitleMousePosition, setWindowTitleMousePosition] =
        useState(POS_0);

    // ================================================================================
    // TITLE WIN MOVE BLOCK
    const handleWindowTitleMouseDown = () => {
        setWindowTitleStyle((prevStyle: {}) => ({
            ...prevStyle,
            background: titleGradientActive,
        }));
        setActiveStatus(true);
    };

    const handleWindowTitleMouseUp = () => {
        setWindowTitleStyle((prevStyle: {}) => ({
            ...prevStyle,
            background: titleGradient,
        }));
        setActiveStatus(false);
    };

    const handleWindowMove = (e: MouseEvent) => {
        if ( e.buttons !== 1 ) {
            handleWindowTitleMouseUp();
        }
        if (titleActiveStatus) {
            let newPos = {
                x: e.clientX - windowTitleMousePosition.x,
                y: e.clientY - windowTitleMousePosition.y,
            };
            // deactivates title if mouse button released
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

    // Compensates for mouse position
    const handleWindowTitleMouseMove = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const div = document.getElementById(windowId);
        if (div) {
            const rect = div.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setWindowTitleMousePosition({ x, y });
        }
    };

    // Applies event to to fire handleWindowMove on mouse movement
    useEffect(() => {
        if (titleActiveStatus) {
            window.addEventListener("mousemove", handleWindowMove);
            return () => {
                window.removeEventListener("mousemove", handleWindowMove);
            };
        }
    }, [titleActiveStatus]);

    // Mouse Leaving Viewport Handler
    const handleMouseLeaveViewport = () =>{
        handleWindowTitleMouseUp()
    }

    useEffect(()=> {
        document.body.addEventListener('mouseleave',handleMouseLeaveViewport)
        return ()=>{
            document.body.removeEventListener('mouseleave',handleMouseLeaveViewport)
        }
    },[])

    // ================================================================================
    // WINDOW RESIZE BLOCK
    const handleResizeButtonMouseDown = () => {
        setWindowResizeStyle((prevStyle: {}) => ({
            ...prevStyle,
            background: resizeButtonGradientActive,
        }));
        setResizeActiveStatus(true);
    };
    const handleResizeButtonMouseUp = () => {
        setWindowResizeStyle((prevStyle: {}) => ({
            ...prevStyle,
            background: resizeButtonGradient,
        }));
        setResizeActiveStatus(false);
    };

    // Applies event to to fire handleWindowResize on mouse movement
    useEffect(() => {
        if (resizeActiveStatus) {
            window.addEventListener("mousemove", handleWindowResize);
            return () => {
                window.removeEventListener("mousemove", handleWindowResize);
            };
        }
    }, [resizeActiveStatus]);

    const handleWindowResize = (e: MouseEvent) => {
        if ( e.buttons !== 1 ) {
            handleResizeButtonMouseUp();
        }
        if (resizeActiveStatus) {
            let newSize = {
                width: e.clientX - windowPosition.x,
                height: e.clientY - windowPosition.y,
            };

            if (newSize.width < defaultWidth) {
                newSize.width = defaultWidth;
            }
            if (newSize.height < updatedHeight) {
                newSize.height = updatedHeight;
            }
            setWindowDimensions(newSize);

            setWindowStyle((prevStyle: {}) => ({
                ...prevStyle,
                width: newSize.width,
                height: newSize.height,
            }));
        }
    };

    // Set height of window to fit content
    const [updatedHeight, setUpdatedHeight] = useState(0);

    useEffect(() => {
        const contentDimensions = document
            .getElementById(windowId)
            ?.getElementsByClassName("window-content")[0]
            .getBoundingClientRect();
        if (contentDimensions) {
            let contentHeight = contentDimensions.height + 50;
            setUpdatedHeight(contentHeight);
            setWindowStyle((prevStyle: {}) => ({
                ...prevStyle,
                height: `${contentHeight}px`,
            }));
        }
    }, []);

    return (
        <div style={windowStyle} id={windowId} className="window">
            <div className="title-bar-container" style={windowTitleStyle}>
                <div
                    className="title-bar"
                    onMouseDown={handleWindowTitleMouseDown}
                    onMouseUp={handleWindowTitleMouseUp}
                    onMouseMove={handleWindowTitleMouseMove}
                >
                    {name}
                </div>
                <div className="exit-window" onClick={handleClickClose}>
                    X
                </div>
            </div>
            <div className="window-content">
                {children}
                <div className="window-resize-container">
                    <div
                        className="window-resize-button"
                        style={windowResizeStyle}
                        onMouseDown={handleResizeButtonMouseDown}
                        onMouseUp={handleResizeButtonMouseUp}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Window;
