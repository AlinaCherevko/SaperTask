import { useEffect, useState } from "react";
import BlockBox from "./BlockBox/BlockBox";
import InputBlock from "./InputBlock/InputBlock";

import style from "./App.module.css";
import SelectorBlock from "./SelectorBlock/SelectorBlock";
import RestartButton from "./RestartButton/RestartButton";

function App() {
  const [size, setSize] = useState(240);
  const [bombNumber, setBombNumber] = useState(10);
  const [isGameWon, setIsGameWon] = useState(false);
  const [bombs, setBombs] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const blockSize = 24;

  const rows = size / blockSize;
  const columns = size / blockSize;

  const generateBombs = () => {
    const bombsIndex = [...Array(Number(rows * columns)).keys()]
      .sort(() => Math.random() - 0.5)
      .slice(0, bombNumber);
    setBombs(bombsIndex);
  };

  useEffect(() => {
    generateBombs();
  }, [bombNumber, size]);

  const handleRestart = () => {
    console.log("гра закінчена");
    console.log(isGameStarted);
    setIsGameStarted(false);
    setIsGameWon(false);
    generateBombs();
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
        isGameWon={isGameWon}
        setIsGameWon={setIsGameWon}
        setIsGameStarted={setIsGameStarted}
        isGameStarted={isGameStarted}
        handleRestart={handleRestart}
        bombsIndex={bombs}
      />
      <RestartButton handleRestart={handleRestart} />
    </div>
  );
}

export default App;
