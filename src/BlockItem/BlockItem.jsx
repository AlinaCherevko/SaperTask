import PropTypes from "prop-types";
import style from "./BlockItem.module.css";
import Icon from "../Icon/Icon";
import { useState } from "react";

function BlockItem({ isMine }) {
  const [hasFlag, setHasFlag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onBlockClick = (e) => {
    if (hasFlag) return;

    if (isMine) {
      e.currentTarget.classList.remove(style.hidden);
      e.currentTarget.classList.add(style.hasBomb);
    }
    if (isOpen) return;
    setIsOpen(true);
    e.currentTarget.classList.remove(style.hidden);
    e.currentTarget.classList.add(style.block);
  };

  const onRightMouseClick = (e) => {
    e.preventDefault();
    if (isOpen) return;

    setHasFlag(!hasFlag);
  };
  return (
    <button
      onContextMenu={onRightMouseClick}
      type="button"
      onClick={onBlockClick}
      className={style.hidden}
    >
      <Icon
        width="20px"
        height="20px"
        fill="red"
        id={hasFlag ? "icon-flag" : ""}
      />
    </button>
  );
}

export default BlockItem;

BlockItem.propTypes = {
  isMine: PropTypes.bool,
  // isOpen: PropTypes.bool,
};
