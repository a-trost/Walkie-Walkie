import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,

} from "react-bootstrap";
import "./App.css";
import "./Button.css";
import "./RequestQueue.css";
import ChooseTeacherButton from "./ChooseTeacherButton.js";

class ChooseTeacher extends Component {
  render() {    
    return (
      <div>
        <h2>Select Your Classroom</h2>
        <Grid>
          <Row className="show-grid">
            {this.props.teacherList.map((teacher, index) => (
              <Col key={index} xs={6} sm={4} lg={3}>
                <ChooseTeacherButton
                  name={teacher.name}
                  onClick={() => this.props.handleClick(teacher.name)}
                  index={index}
                  block
                />
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ChooseTeacher;