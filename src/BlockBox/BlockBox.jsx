import BlockItem from "../Blockitem/Blockitem";

import PropTypes from "prop-types";

function BlockBox({ width = "240px", height = "240px" }) {
  const bombNumber = 20;
  const blockSize = 24;
  const rows = height / blockSize;
  const columns = width / blockSize;

  const bombsIndex = [...Array(Number(rows * columns)).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, bombNumber);
  //   console.log(bombsIndex);

  const blocks = Array.from({ length: rows * columns }, (_, index) => ({
    id: index,
    isOpen: false,
    isMine: bombsIndex.includes(index),
  }));

  //   console.log(blocks);

  const blockBoxStyle = {
    width: `${width}px`,
    height: `${height}px`,
    display: "grid",
    gridTemplateColumns: `repeat(${width / blockSize}, 1fr)`,
    gridTemplateRows: `repeat(${height / blockSize}, 1fr)`,
    backgroundColor: "lightGray",
  };

  return (
    <div style={blockBoxStyle}>
      {blocks.map((block) => (
        <BlockItem
          key={block.index}
          isMine={block.isMine}
          hasFlag={block.hasFlag}
        />
      ))}
    </div>
  );
}

export default BlockBox;
BlockBox.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
// ств масив який зскл з 10масиві в кожному масиві 10 ійтемів
