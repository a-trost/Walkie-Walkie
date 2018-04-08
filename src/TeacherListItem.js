import React from "react";
import {
  ListGroupItem
} from "react-bootstrap";
import moment from "moment";

function TeacherListItem(props) {
  let destination; 
  if (props.item.nurse && props.item.bathroom) {
    destination = "Nurse & Bathroom";
  } else if (props.item.nurse) {
    destination = "Nurse";
  } else {
    destination = "Bathroom";
  }
  return (
    <ListGroupItem
      header={props.item.user.name}
      bsStyle={
        props.item.nurse && props.item.bathroom
          ? "success"
          : props.item.nurse ? "danger" : "info"
      }
      className="teacher-list-item"
    >
      {props.item.user.floor} → {destination}
      <br/>
      {moment(props.item.timestamp).fromNow()}
      <span onClick={props.onClick} className="remove-list-item">
        X
      </span>
    </ListGroupItem>
  );
}

export default TeacherListItem;