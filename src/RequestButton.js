import React from "react";
import {
  Button,
} from "react-bootstrap";

// Set button prop 'active' if request has been made.
function RequestButton(props) {
  return (
    <Button
      onClick={props.onClick}
      bsStyle={props.buttonStyle}
      className="request-btn"
      key={props.index}
      block
    >
      <img src={props.icon} className="request-icon" alt={props.text} />
      <span className="request-text">{props.text}</span>
    </Button>
  );
}

export default RequestButton;