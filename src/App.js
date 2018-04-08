import React, { Component } from "react";
import {
  Button,
  Grid,
  Row,
  Col,
} from "react-bootstrap";
import moment from "moment";
import { db } from './fire.js';
import RequestButton from "./RequestButton.js";
import ChooseTeacher from "./ChooseTeacher.js";
import RequestQueue from "./RequestQueue.js";
import AppHeader from "./AppHeader.js";

import "./App.css";
import "./Button.css";
import "./RequestQueue.css";
import nurseSvg from "./images/nurse.svg";
import bathroomSvg from "./images/bathroom.svg";
import checkSvg from "./images/check.svg";
import 'firebase/firestore';
require("firebase/firestore");

const destinationList = [
  { name: "Nurse", icon: "nurseSvg", style: "danger" },
  { name: "Bathroom", icon: "bathroomSvg", style: "primary" },
  { name: "BathroomNurse", icon: "bathroomNurseSvg", style: "primary" },  
  { name: "PickUp", icon: "pickupSvg", style: "success" },
  { name: "Paper", icon: "paperSvg", style: "info" },
  { name: "Office", icon: "officeSvg", style: "warning" },
  { name: "Custom", icon: "customSvg", style: "" },
]

// const teacherList = [];



// danger = nurse, info=bathroom, success=both


class App extends Component {
  constructor(props) {
    super(props);
    this.handleTeacherSelection = this.handleTeacherSelection.bind(this);
    this.removeRequest = this.removeRequest.bind(this);
    this.state = {
      user: null,
      teacherList: [],
      teacherQueue: [],

    };
  }

  initalizeRooms() {
    this.state.teacherList.forEach((room, index) => {
    db.collection("rooms").doc(room.name).set({name: room.name, floor: room.floor, id:index , color: room.color}).then(function() {
      console.log("Room successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing room: ", error);
  });
  })
  }

  initalizeDestinations() {
    destinationList.forEach((destination, index) => {
      db.collection("destinations").doc(destination.name).set({name: destination.name, icon: destination.icon,  style:destination.style }).then(function() {
        console.log("Destination successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing destination: ", error);
    });
    })
    }


  handleRequestSelection(request) {
    let queue = this.state.teacherQueue.slice();
    let itemIndex = queue.findIndex(item => item.user === this.state.user);
    if (itemIndex < 0) {
      let newItem = {
        user: this.state.user,
        bathroom: false,
        nurse: false,
        timestamp: moment()
      };
      itemIndex = queue.length;
      queue.push(newItem);
    }
    if (request === "Bathroom") {
      queue[itemIndex].bathroom = !queue[itemIndex].bathroom;
    } else if (request === "Nurse") {
      queue[itemIndex].nurse = !queue[itemIndex].nurse;
    }
    if (!queue[itemIndex].nurse && !queue[itemIndex].bathroom) {
      queue.splice(itemIndex, 1);
    }
    this.setState({
      teacherQueue: queue
    });
  }

  handleTeacherSelection(i) {
    let user = this.state.teacherList.filter(user => user.name === i)[0];
    this.setState({ user: user });
    localStorage.setItem("user", JSON.stringify(user));
  }

  determineView() {
    if (this.state.user) {
      if (this.state.user.name === "Hallway") {
        return this.renderHallwayView();
      } else {
        return this.renderTeacherView();
      }
    } else {
      return this.renderChooseTeacher();
    }
  }

  renderChooseTeacher() {
    return <ChooseTeacher handleClick={this.handleTeacherSelection} teacherList={this.state.teacherList} />;
  }

  removeRequest(index) {
    console.log(index);
    let queue = this.state.teacherQueue.slice();
    queue.splice(index, 1);
    this.setState({
      teacherQueue: queue
    });
  }

  renderOfficeView() {
    return (
      <div>
        <TeacherQueue
          removeRequest={this.removeRequest}
          teacherQueue={this.state.teacherQueue}
        />
      </div>
    );
  }
  renderHallwayView() {
    return (
      <div>
        <TeacherQueue
          removeRequest={this.removeRequest}
          teacherQueue={this.state.teacherQueue}
        />
      </div>
    );
  }

  signOutTeacher() {
    this.setState({ user: null });
    localStorage.setItem("user", JSON.stringify(""));
  }

  renderTeacherView() {
    let bathroomStyle = "primary";
    let nurseStyle = "danger";
    let bathroomIcon = bathroomSvg;
    let nurseIcon = nurseSvg;
    let placeInLine;
    let queue = this.state.teacherQueue.slice();
    let itemIndex = queue.findIndex(item => item.user === this.state.user);
    if (itemIndex >= 0) {
      if (queue[itemIndex].nurse) {
        nurseStyle = "success";
        nurseIcon = checkSvg;
      }
      if (queue[itemIndex].bathroom) {
        bathroomStyle = "success";
        bathroomIcon = checkSvg;
      }
      placeInLine =
        itemIndex === 1
          ? "You have 1 class ahead of you"
          : "You have " + itemIndex + " classes ahead of you";
    }

    return (
      <div>
        <h2>Request for {this.state.user.name}</h2>
        <Grid>
          <Row className="show-grid">
            <Col key={0} xs={6}>
              <RequestButton
                onClick={() => this.handleRequestSelection("Bathroom")}
                text="Bathroom"
                icon={bathroomIcon}
                buttonStyle={bathroomStyle}
                key={0}
              />
            </Col>
            <Col key={1} xs={6}>
              <RequestButton
                onClick={() => this.handleRequestSelection("Nurse")}
                text="Nurse"
                icon={nurseIcon}
                buttonStyle={nurseStyle}
                key={1}
              />
            </Col>
          </Row>
          <h3>{placeInLine}</h3>
        </Grid>
      </div>
    );
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user"))) {
      this.setState({ user: JSON.parse(localStorage.getItem("user")) });
    }
      var self = this;
      let list = [];
      db.collection("rooms").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            list.push(doc.data());
            // console.log(doc.id, " => ", doc.data());
            self.setState({
              teacherList: list,
            });
        });
      })
      
    
  }

  checkLogin() {
    if (this.state.user) {
      return (
        <div>
          <p>Signed in as {this.state.user.name}</p>
          <Button
            bsStyle="primary"
            bsSize="small"
            onClick={() => this.signOutTeacher()}
          >
            Sign Out
          </Button>
        </div>
      );
    } else {
      return <p>Choose a Teacher to Continue</p>;
    }
  }

  render() {
    return (
      <div className="App">
        <AppHeader />
        {this.determineView()}
        {this.checkLogin()}
      </div>
    );
  }
}



export default App;


// TODO: Lock down app for users only
// TODO: Add buttons for office to make those requests
// TODO: Add more request types: Pick up kid, deliver papers, come to office, blank field alert
// TODO: Change request item to more generic format
// TODO: Make new list components
// TODO: Change Hallway's button color to distinguish it
// TODO: Refactor functions into individual files
// TODO: Refactor css into individual files
// TODO: Make list go to firebase database
// TODO: Add Undo feature
// TODO: Add chime to play on Hallway view when new teacher object appears
// TODO: Make changes update live, including addition/deletion/time changes
// TODO: Have the teacher view refresh on Hallway's deletion of the list object
