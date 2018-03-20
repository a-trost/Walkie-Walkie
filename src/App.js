import React, { Component } from "react";
import {
  Button,
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import "./App.css";
import "./Button.css";
import nurse from "./nurse.svg";
import bathroom from "./bathroom.svg";
const teacherList = [
  { name: "Angeli", floor: 1 },
  { name: "Berrie", floor: 2 },
  { name: "Cyphers", floor: 1 },
  { name: "DelBene", floor: 1 },
  { name: "Garrett", floor: 3 },
  { name: "Graham", floor: 1 },
  { name: "Hulsart", floor: 1 },
  { name: "Hickmon", floor: 2 },
  { name: "McPherson", floor: 2 },
  { name: "Palermo", floor: 1 },
  { name: "Pouliovalis", floor: 1 },
  { name: "Psaradellis", floor: 3 },
  { name: "Ryan", floor: 1 },
  { name: "Trost", floor: 2 },
  { name: "West", floor: 1 },
  { name: "Art", floor: 0 },
  { name: "Dance/Music", floor: 2 },
  { name: "Gym", floor: 0 },
  { name: "Science", floor: 3 },
  { name: "Spanish", floor: 0 },
  { name: "Nurse", floor: 0 },
  { name: "Office", floor: 1 },
  { name: "Hallway Monitor", floor: 2 }
];

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

class ChooseTeacher extends Component {
  render() {
    return (
      <div>
        <h2>Select Your Classroom</h2>
        <Grid>
          <Row className="show-grid">
            {teacherList.map((teacher, index) => (
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

// Set button prop 'active' if request has been made.
function RequestButton(props) {
  return (
    <Button
      bsStyle={props.style}
      className="request-btn"
      // onClick={props.onClick}
      key={props.index}
      block
    >
      <img src={props.icon} className="request-icon" alt={props.text} />
      <span className="request-text">{props.text}</span>
    </Button>
  );
}

class TeacherQueue extends Component {
  render() {
    return (
      <div className="teacher-queue">
        <h2>Teacher Queue</h2>
        <ListGroup>
          <ListGroupItem header="Heading 1">Some body text</ListGroupItem>
          <ListGroupItem header="Heading 2" href="#">
            Linked item
          </ListGroupItem>
          <ListGroupItem header="Heading 3" bsStyle="danger">
            Danger styling
          </ListGroupItem>
        </ListGroup>
        {/* {this.props.teacherQueue.map((teacher)=> <TeacherItem teacher={teacher}/>)} */}
      </div>
    );
  }
}

class TeacherItem extends Component {
  render() {
    return (
      <div className="teacher-item">
        <a className="remove-player" onClick={this.props.onRemove}>
          ✖
        </a>
        {this.props.teacher}
        <i className="fas fa-medkit" />
        <i className="fas fa-female" />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleTeacherSelection = this.handleTeacherSelection.bind(this);
    this.state = {
      user: null,
      teacherQueue: []
    };
  }
  handleTeacherSelection(i) {
    let user = teacherList.filter(user => user.name === i)[0];
    this.setState({ user: user });
    localStorage.setItem("user", JSON.stringify(user));
  }

  determineView() {
    if (this.state.user) {
      if (this.state.user.name === "Office") {
        return this.renderOfficeView();
      } else if (this.state.user.name === "Hallway Monitor") {
        return this.renderHallwayView();
      } else {
        return this.renderTeacherView();
      }
    } else {
      return this.renderChooseTeacher();
    }
  }

  renderChooseTeacher() {
    return <ChooseTeacher handleClick={this.handleTeacherSelection} />;
  }

  renderOfficeView() {
    return (
      <div>
        <p>Signed in as {this.state.user.name}</p>
        <button onClick={() => this.signOutTeacher()}>Sign Out</button>
      </div>
    );
  }
  renderHallwayView() {
    return (
      <div>
        <p>Signed in as {this.state.user.name}</p>
        <button onClick={() => this.signOutTeacher()}>Sign Out</button>
      </div>
    );
  }

  signOutTeacher() {
    this.setState({ user: null });
    localStorage.setItem("user", JSON.stringify(""));
  }

  renderTeacherView() {
    return (
      <div>
        <h2>Request for {this.state.user.name}</h2>
        <Grid>
          <Row className="show-grid">
            <Col key={0} xs={6}>
              <RequestButton
                text="Bathroom"
                icon={bathroom}
                style="success"
                key={0}
              />
            </Col>
            <Col key={1} xs={6}>
              <RequestButton
                text="Nurse"
                icon={nurse}
                style="primary"
                key={1}
              />
            </Col>
          </Row>
        </Grid>
        <p>Signed in as {this.state.user.name}</p>
        <button onClick={() => this.signOutTeacher()}>Sign Out</button>
      </div>
    );
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user"))) {
      this.setState({ user: JSON.parse(localStorage.getItem("user")) });
    }
  }

  render() {
    return (
      <div className="App">
        <AppHeader />
        {this.determineView()}
        <TeacherQueue />
      </div>
    );
  }
}

function AppHeader() {
  return (
    <header className="App-header">
      <h1 className="App-title">Hallway Requests</h1>
    </header>
  );
}

export default App;
