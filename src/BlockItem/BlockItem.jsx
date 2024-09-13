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
  // setIsGameStarted,
  isGameStarted,
  isOpen,
  openBlock,
  openAllBlock,
  // setIsLose,
  isLose,
  // handleRestart,
}) {
  const [hasFlag, setHasFlag] = useState(false);

  const handleBlockClick = () => {
    if (hasFlag || isOpen) return;

    if (isMine) {
      setIsLost(true);
      // setIsLose(true);
      alert("You have lose :(");
      openAllBlock();
    }
    openBlock(id);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (!isOpen && !isLose) {
      setHasFlag((prevHasFlag) => !prevHasFlag);
    }
  };

  useEffect(() => {
    if (isLost && isMine) {
      openAllBlock(id);
    }
  }, [isLost, isMine, id]);

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
      // className={isOpen || (isLost && isMine) ? style.block : style.hidden}
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
  isLose: PropTypes.bool,
  setIsLose: PropTypes.func,
  handleRestart: PropTypes.func,
};
