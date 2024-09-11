import PropTypes from "prop-types";
import sprite from "/symbol-defs.svg";

function Icon({ id, fill, stroke, width, height }) {
  return (
    <svg fill={fill} stroke={stroke} width={width} height={height}>
      <use href={`${sprite}#${id}`}></use>
    </svg>
  );
}

export default Icon;
Icon.propTypes = {
  id: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
