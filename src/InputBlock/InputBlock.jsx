import PropTypes from "prop-types";
import { Box, Select } from "@chakra-ui/react";

function InputBlock({ inputChange }) {
  const handleSelectChange = (e) => {
    inputChange(e.target.value);
  };

  return (
    <Box>
      <p>Field size </p>
      <Select onChange={handleSelectChange} variant="flushed">
        <option value="240">240х240</option>
        <option value="264">264х264</option>
        <option value="288">288х288</option>
        <option value="312">312х312</option>
      </Select>
    </Box>
  );
}
export default InputBlock;

InputBlock.propTypes = {
  placeholder: PropTypes.string,
  inputChange: PropTypes.func,
  min: PropTypes.number,
  step: PropTypes.number,
  max: PropTypes.number,
};
