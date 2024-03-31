import { useState } from "react";
import Window from "./components/Window";
import MyButton from "./components/MyButton";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);
    const onClickCount = () => setCount((count) => count + 1);

    return (
        <div>
            <Window
                name={"Counter"}
                windowId={"test1"}
                children={
                    <div>
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
                        <div className="card">
                            <MyButton
                                onClickFunc={onClickCount}
                                value={`count is ${count}`}
                            />
                        </div>
                    </div>
                }
            />

            <h1>DESKTOP_TOOLKIT_PROJ</h1>
        </div>
    );
}

export default App;
