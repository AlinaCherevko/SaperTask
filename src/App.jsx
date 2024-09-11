import { useState } from "react";
import BlockBox from "./BlockBox/BlockBox";
import InputBlock from "./InputBlock/InputBlock";

import style from "./App.module.css";

function App() {
  const [width, setWidth] = useState(240);
  const [height, setHeight] = useState(240);
  const [bombNumber, setBombNumber] = useState(10);

  const inputWidthChange = (value) => {
    setWidth(value);
  };
  const inputHeightChange = (value) => {
    setHeight(value);
  };

  return (
    <>
      <h1>Saper</h1>
      <div className={style.inputWrapper}>
        <InputBlock placeholder="Choose width" inputChange={inputWidthChange} />
        <InputBlock
          placeholder="Choose height"
          inputChange={inputHeightChange}
        />
      </div>

      <BlockBox width={width} height={height} />
    </>
  );
}

export default App;
