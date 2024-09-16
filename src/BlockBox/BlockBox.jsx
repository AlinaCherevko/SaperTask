import { useState, useEffect } from "react";
import BlockItem from "../BlockItem/BlockItem";
import PropTypes from "prop-types";

function BlockBox({
  width = 240,
  height = 240,
  bombNumber,
  bombsIndex,
  setIsGameStarted,
  isGameWon,
  setIsGameWon,
  isGameStarted,
}) {
  const [isLost, setIsLost] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [openedSafeBlocks, setOpenedSafeBlocks] = useState(0);

  const blockSize = 24;
  const rows = height / blockSize;
  const columns = width / blockSize;

  useEffect(() => {
    // шукаємо для кожної комірки к-ть межуючих бомб
    const findNumbersBombsAround = (index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;

      let mineCount = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const neighborRow = row + i;
          const neighborCol = column + j;

          if (
            neighborRow < 0 ||
            neighborRow >= rows ||
            neighborCol < 0 ||
            neighborCol >= columns
          ) {
            continue;
          }

          const neighborIndex = neighborRow * columns + neighborCol;
          if (bombsIndex.includes(neighborIndex)) {
            mineCount++;
          }
        }
      }
      return mineCount;
    };

    // формуємо наш масив комірок
    const initialBlocksArray = Array.from(
      { length: rows * columns },
      (_, index) => ({
        id: index,
        isMine: bombsIndex.includes(index),
        numberOfMinesAround: findNumbersBombsAround(index),
        isOpen: false,
      })
    );
    setBlocks(initialBlocksArray);
  }, [rows, columns, bombNumber, bombsIndex]);

  // відкриваємо всі суміжні комірки
  const openAdjacentBlocks = (index) => {
    setBlocks((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      let newOpenedBlocks = 0;

      const openNeighbors = (currentIndex) => {
        const currentRow = Math.floor(currentIndex / columns);
        const currentColumn = currentIndex % columns;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const neighborRow = currentRow + i;
            const neighborCol = currentColumn + j;
            const neighborIndex = neighborRow * columns + neighborCol;

            if (
              neighborRow >= 0 &&
              neighborRow < rows &&
              neighborCol >= 0 &&
              neighborCol < columns &&
              !newBlocks[neighborIndex].isOpen
            ) {
              newBlocks[neighborIndex].isOpen = true;

              // Якщо це безпечна коміркa, збільшуємо лічильник
              if (!newBlocks[neighborIndex].isMine) {
                newOpenedBlocks++;
              }

              // Рекурсивно відкриваємо сусідів, якщо навколо немає мін
              if (newBlocks[neighborIndex].numberOfMinesAround === 0) {
                openNeighbors(neighborIndex);
              }
            }
          }
        }
      };
      openNeighbors(index);
      console.log(newOpenedBlocks);
      setOpenedSafeBlocks((prevCount) => prevCount + newOpenedBlocks);
      return newBlocks;
    });
  };

  //відкриваємо 1 комірку
  const openBlock = (id) => {
    if (!isGameStarted) {
      setIsGameStarted(true);
    }

    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === id && !block.isMine && !block.isOpen) {
          setOpenedSafeBlocks((prevCount) => prevCount + 1);
          console.log("клік по комірці з id", id);

          if (block.numberOfMinesAround === 0) {
            openAdjacentBlocks(id);
          }
          return { ...block, isOpen: true };
        }
        return block;
      })
    );
  };

  // відкриваємо усі комірки
  const openAllBlock = () => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => ({ ...block, isOpen: true }))
    );
  };

  // закриваємо всі комірки
  const handleRestart = () => {
    setIsLost(false);
    setOpenedSafeBlocks(0);
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => ({
        ...block,
        isOpen: false,
      }))
    );
  };

  // порівнюємо к-ть відкритих комірок та комірок, що не містять бомби
  useEffect(() => {
    const freeFromBombsBlocks = rows * columns - bombNumber;
    if (freeFromBombsBlocks === openedSafeBlocks) {
      alert("You won :)");
    }
  }, [bombNumber, openedSafeBlocks, rows, columns]);

  const blockBoxStyle = {
    width: `${width}px`,
    height: `${height}px`,
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    backgroundColor: "lightGray",
  };

  return (
    <div style={blockBoxStyle}>
      {blocks.map((block) => (
        <BlockItem
          key={block.id}
          id={block.id}
          isMine={block.isMine}
          numberOfMinesAround={block.numberOfMinesAround}
          setIsLost={setIsLost}
          isLost={isLost}
          isOpen={block.isOpen}
          openBlock={openBlock}
          isGameWon={isGameWon}
          setIsGameWon={setIsGameWon}
          setIsGameStarted={setIsGameStarted}
          isGameStarted={isGameStarted}
          openAllBlock={openAllBlock}
          handleRestart={handleRestart}
        />
      ))}
    </div>
  );
}

export default BlockBox;

BlockBox.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  bombNumber: PropTypes.number,
  setIsGameStarted: PropTypes.func,
  isLost: PropTypes.bool,
  setIsLose: PropTypes.func,
  isGameStarted: PropTypes.bool,
  bombsIndex: PropTypes.arrayOf(PropTypes.number),
  isGameWon: PropTypes.bool,
  setIsGameWon: PropTypes.func,
};
