import { useState } from "react";
import MyButton from "../components/MyButton";
import Window from "../components/Window";

const Counter = () => {
    // Visiblity needs to be in each proj comp to handle clickClose
    const [isVisible, setIsVisible] = useState(true);
    const handleClickClose = () => setIsVisible((prevState) => !prevState);
    const defaultWidth = 200;
    const defaultHeight = 300;

    const [count, setCount] = useState(0);
    const onClickCount = () => setCount((count) => count + 1);

    const counterStyling = {
        paddingTop: "15px"
    }

    return (
        <>
            {isVisible && (
                <Window
                    name={"Counter"}
                    windowId={"counter"}
                    handleClickClose={handleClickClose}
                    defaultWidth={defaultWidth}
                    defaultHeight={defaultHeight}
                    children={
                        <div style={counterStyling}>
                        <MyButton
                            onClickFunc={onClickCount}
                            value={`count is ${count}`}
                            />
                            </div>
                    }
                />
            )}
        </>
    );
};

export default Counter;
