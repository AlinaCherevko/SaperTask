import PropTypes from "prop-types";
import style from "./BlockItem.module.css";
import Icon from "../Icon/Icon";
import { useEffect, useState } from "react";

function BlockItem({
  id,
  isMine,
  numberOfMinesAround,
  setIsLost,
  isLost,
  setIsGameStarted,
  isGameStarted,
  isOpen,
  openBlock,
  openAllBlock,
  setIsGameWon,
  isGameWon,
  handleRestart,
}) {
  const [hasFlag, setHasFlag] = useState(false);

  const handleBlockClick = () => {
    if (hasFlag || isOpen || isGameWon) return;

    if (isMine) {
      setIsLost(true);
      setIsGameWon(false);
      openAllBlock();
      alert("You have lose :(");
    }
    if (!isGameStarted || !isOpen || !hasFlag) {
      openBlock(id);
    }
  };

  const handleRightClick = (e) => {
    if (!isGameStarted) {
      setIsGameStarted(true);
      console.log("start game");
    }
    e.preventDefault();
    if (!isOpen) {
      setHasFlag((prevHasFlag) => !prevHasFlag);
    }
  };

  useEffect(() => {
    if (!isGameStarted) {
      handleRestart();
      if (hasFlag && !isGameStarted) setHasFlag(false);
    }
  }, [isGameStarted]);

  const renderBlockContent = () => {
    if (isOpen && !isMine && isGameStarted) {
      return <span>{numberOfMinesAround || ""}</span>;
    }

    if (isOpen && isMine && isLost && isGameStarted) {
      return <Icon width="20px" height="20px" fill="red" id="icon-bomb" />;
    }

    return (
      <Icon
        width="20px"
        height="20px"
        fill="red"
        id={hasFlag ? "icon-flag" : ""}
      />
    );
  };

  return (
    <button
      onContextMenu={handleRightClick}
      type="button"
      onClick={handleBlockClick}
      className={
        !isGameStarted
          ? style.hidden
          : isOpen || (isLost && isMine)
          ? style.block
          : style.hidden
      }
    >
      {renderBlockContent()}
    </button>
  );
}
export default BlockItem;

BlockItem.propTypes = {
  isMine: PropTypes.bool,
  numberOfMinesAround: PropTypes.number,
  isLost: PropTypes.bool,
  setIsLost: PropTypes.func,
  setIsGameStarted: PropTypes.func,
  isGameStarted: PropTypes.bool,
  isOpen: PropTypes.bool,
  openBlock: PropTypes.func,
  openAllBlock: PropTypes.func,
  id: PropTypes.number,
  isGameWon: PropTypes.bool,
  setIsGameWon: PropTypes.func,
  handleRestart: PropTypes.func,
};
