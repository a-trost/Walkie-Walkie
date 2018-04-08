import React, {Component,} from "react";
import {
  Grid,
  Row,
  Badge,
  ListGroup,
} from "react-bootstrap";

import TeacherListItem from "./TeacherListItem.js"

class RequestQueue extends Component {
  render() {
    return (
      <div className="teacher-queue">
        <h2>
          Request Queue <Badge>{this.props.requestQueue.length}</Badge>
        </h2>
        <Grid>
          <Row className="show-grid">
            <ListGroup>
              {this.props.requestQueue.map((item, index) => (
                <TeacherListItem
                  onClick={() => this.props.removeRequest(index)}
                  index={index}
                  item={item}
                  key={index}
                />
              ))}
            </ListGroup>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RequestQueue;