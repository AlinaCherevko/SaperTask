import { Box, Select } from "@chakra-ui/react";
import PropTypes from "prop-types";

function SelectorBlock({ selectorChange, isGameStarted }) {
  const onSelectChange = (e) => {
    selectorChange(e.target.value);
  };

  return (
    <Box>
      <p>Bombs number</p>
      <Select
        size="md"
        variant="flushed"
        onChange={onSelectChange}
        disabled={isGameStarted}
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </Select>
    </Box>
  );
}

SelectorBlock.propTypes = {
  selectorChange: PropTypes.func,
  isGameStarted: PropTypes.bool,
};

export default SelectorBlock;
