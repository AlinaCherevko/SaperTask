import PropTypes from "prop-types";
import style from "./BlockItem.module.css";
import Icon from "../Icon/Icon";
import { useState } from "react";

function BlockItem({ isMine }) {
  const [hasFlag, setHasFlag] = useState(false);

  const onBlockClick = (e) => {
    if (hasFlag) return;

    if (isMine) {
      e.currentTarget.classList.remove(style.hidden);
      e.currentTarget.classList.add(style.hasBomb);
    }

    e.currentTarget.classList.remove(style.hidden);
    e.currentTarget.classList.add(style.block);
  };

  const onRightMouseClick = (e) => {
    e.preventDefault();
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
};
