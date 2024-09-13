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
  setIsLose,
  isLose,
}) {
  const [hasFlag, setHasFlag] = useState(false);

  const handleBlockClick = () => {
    if (hasFlag || isOpen) return;

    if (isMine) {
      setIsLost(true);
      setIsLose(true);
      alert("You have lose :(");
    } else {
      openBlock(id);
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (!isOpen && !isLose) {
      setHasFlag((prevHasFlag) => !prevHasFlag);
    }
  };

  useEffect(() => {
    if (isLost && isMine) {
      openBlock(id);
    }
  }, [isLost, isMine, id]);

  const renderBlockContent = () => {
    if (isOpen && !isMine) {
      return <span>{numberOfMinesAround || ""}</span>;
    }

    if (isOpen && isMine && isLost) {
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
      className={isOpen || (isLost && isMine) ? style.block : style.hidden}
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
  id: PropTypes.number,
  isLose: PropTypes.bool,
  setIsLose: PropTypes.func,
};
