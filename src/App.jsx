import { useState } from "react";
import BlockBox from "./BlockBox/BlockBox";
import InputBlock from "./InputBlock/InputBlock";

import style from "./App.module.css";
import SelectorBlock from "./SelectorBlock/SelectorBlock";
import RestartButton from "./RestartButton/RestartButton";

function App() {
  const [size, setSize] = useState(240);
  const [bombNumber, setBombNumber] = useState(10);
  const [isLose, setIsLose] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleRestart = () => {
    setIsGameStarted(false);
    setIsLose(false);
  };

  const inputSizeChange = (value) => {
    if (!isGameStarted) {
      setSize(value);
      return;
    }
  };

  const selectorBombChange = (value) => {
    if (!isGameStarted) {
      setBombNumber(value);
      return;
    }
  };

  return (
    <div className={style.container}>
      <h1>Saper</h1>
      <div className={style.inputWrapper}>
        <InputBlock inputChange={inputSizeChange} />
        <SelectorBlock
          selectorChange={selectorBombChange}
          isGameStarted={isGameStarted}
        />
      </div>
      <BlockBox
        width={+size}
        height={+size}
        bombNumber={+bombNumber}
        isLose={isLose}
        setIsLose={setIsLose}
        setIsGameStarted={setIsGameStarted}
        isGameStarted={isGameStarted}
      />
      <RestartButton handleRestart={handleRestart} />
    </div>
  );
}

export default App;
