import { useState } from "react";
import MyButton from "../components/MyButton";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import Window from "../components/Window";

const Counter = () => {
    // Visiblity needs to be in each proj comp to handle clickClose
    const [isVisible,setIsVisible] = useState(true)
    const handleClickClose = ()=>setIsVisible(prevState => !prevState)

    const [count, setCount] = useState(0);
    const onClickCount = () => setCount((count) => count + 1);

    return (
    <>
        {isVisible &&
        <Window
            name={"Counter"}
            windowId={"test1"}
            handleClickClose={handleClickClose}
            children={
                <div>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
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
            }
            </>
    );
};

export default Counter;
