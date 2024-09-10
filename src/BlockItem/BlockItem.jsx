import PropTypes from "prop-types";
import style from "./BlockItem.module.css";

function BlockItem({ isMine }) {
  const onBlockClick = (e) => {
    if (isMine) {
      e.currentTarget.classList.remove(style.hidden);
      e.currentTarget.classList.add(style.hasBomb);
    }

    e.currentTarget.classList.remove(style.hidden);
    e.currentTarget.classList.add(style.block);
  };
  return <div onClick={onBlockClick} className={style.hidden}></div>;
}

export default BlockItem;

BlockItem.propTypes = {
  isMine: PropTypes.bool.isRequired,
};
