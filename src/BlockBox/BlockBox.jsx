import { useState, useEffect } from "react";
import BlockItem from "../BlockItem/BlockItem";
import PropTypes from "prop-types";

function BlockBox({
  width = 240,
  height = 240,
  bombNumber,
  bombsIndex,
  setIsGameStarted,
  // isLose,
  setIsLose,
  isGameStarted,
}) {
  const [isLost, setIsLost] = useState(false);
  const [blocks, setBlocks] = useState([]);

  const blockSize = 24;
  const rows = height / blockSize;
  const columns = width / blockSize;

  useEffect(() => {
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

  const openBlock = (id) => {
    console.log("open block click");
    setIsGameStarted(true);

    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, isOpen: true } : block
      )
    );
  };

  const openAllBlock = () => {
    console.log("open all block click");
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => ({ ...block, isOpen: true }))
    );
  };

  const handleRestart = () => {
    setIsLost(false);
    console.log("handle restart");
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => ({
        ...block,
        isOpen: false,
      }))
    );
  };

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
          // isLose={isLose}
          setIsLose={setIsLose}
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
};
