import PropTypes from "prop-types";
import style from "./InputBlock.module.css";

function InputBlock({ placeholder, inputChange, min, step, max }) {
  const handleInputChange = (e) => {
    inputChange(e.target.value);
  };
  return (
    <input
      className={style.input}
      placeholder={placeholder}
      type="number"
      min={min}
      step={step}
      max={max}
      onChange={handleInputChange}
    ></input>
  );
}

export default InputBlock;

InputBlock.propTypes = {
  placeholder: PropTypes.string,
  inputChange: PropTypes.func,
  min: PropTypes.string,
  step: PropTypes.string,
  max: PropTypes.string,
};
