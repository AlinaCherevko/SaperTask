import PropTypes from "prop-types";
import { Button } from "@chakra-ui/react";

function RestartButton({ handleRestart }) {
  return <Button onClick={handleRestart}>New game</Button>;
}

RestartButton.propTypes = {
  handleRestart: PropTypes.func.isRequired,
};

export default RestartButton;
