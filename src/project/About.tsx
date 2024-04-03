import { useState, useEffect } from "react";
import Window from "../components/Window";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";

const About = () => {
    
    // mouse position
    const [mousePos, setMousePos] = useState({x:0,y:0});
    
    useEffect(() => {
        if (true) {
            window.addEventListener("mousemove", updateMousePos);
            return () => {
                window.removeEventListener("mousemove", updateMousePos);
            };
        }
    }, [mousePos]);
    
    const updateMousePos = (e: MouseEvent) => {
        const currentPos = {
            x: e.clientX,
            y: e.clientY,
        };
        setMousePos(currentPos);
    };
    const [isVisible, setIsVisible] = useState(true);
    const handleClickClose = () => setIsVisible((prevState) => !prevState);
    const defaultWidth = 300;
    const defaultHeight = 300;
    return (
        <>
            {isVisible && (
                <Window
                    name={"About"}
                    windowId={"about"}
                    handleClickClose={handleClickClose}
                    defaultWidth={defaultWidth}
                    defaultHeight={defaultHeight}
                    children={
                        <>
                            <h2>About</h2>
                            <a href="https://vitejs.dev" target="_blank">
                                <img
                                    src={viteLogo}
                                    className="logo"
                                    alt="Vite logo"
                                />
                            </a>
                            <a href="https://react.dev" target="_blank">
                                <img
                                    src={reactLogo}
                                    className="logo react"
                                    alt="React logo"
                                />
                            </a>
                            {/* spacer to prevent rotating logo from breaking things */}
                            <br></br>
                            <br></br>
                        </>
                    }
                />
            )}
        </>
    );
};

export default About;
