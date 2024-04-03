import { useState } from "react";
import Window from "../components/Window";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";

const About = () => {
    const [isVisible, setIsVisible] = useState(true);
    const handleClickClose = () => setIsVisible((prevState) => !prevState);
    const defaultWidth = 300
    const defaultHeight = 300
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
