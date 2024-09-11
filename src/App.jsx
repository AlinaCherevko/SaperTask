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

  const inputBombChange = (value) => {
    setBombNumber(value);
  };

  return (
    <>
      <h1>Saper</h1>
      <div className={style.inputWrapper}>
        <InputBlock
          placeholder="Choose width"
          inputChange={inputWidthChange}
          min="240"
          step="24"
          max="480"
        />
        <InputBlock
          placeholder="Choose height"
          inputChange={inputHeightChange}
          min="240"
          step="24"
          max="480"
        />
        <InputBlock
          placeholder="Bombs number"
          inputChange={inputBombChange}
          min="10"
          step="5"
          max="25"
        />
      </div>

      <BlockBox width={width} height={height} bombNumber={bombNumber} />
    </>
  );
}

export default App;
