import React from "react";
import {
  Button,
} from "react-bootstrap";

function ChooseTeacherButton(props) {
  return (
    <Button
      bsStyle="danger"
      onClick={props.onClick}
      key={props.index}
      name={props.name}
      block
    >
      {props.name}
    </Button>
  );
}

export default ChooseTeacherButton;