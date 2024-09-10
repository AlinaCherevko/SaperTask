import PropTypes from "prop-types";
import style from "./InputBlock.module.css";

function InputBlock({ placeholder, inputChange }) {
  const handleInputChange = (e) => {
    inputChange(e.target.value);
  };
  return (
    <input
      className={style.input}
      placeholder={placeholder}
      type="number"
      min="240"
      step="24"
      max="480"
      onChange={handleInputChange}
    ></input>
  );
}

export default InputBlock;

InputBlock.propTypes = {
  placeholder: PropTypes.string,
  inputChange: PropTypes.func,
};
