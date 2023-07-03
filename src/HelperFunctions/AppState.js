import React, { Component } from "react";

class AppState extends Component {
  handleState(action) {
    switch (action) {
      case 200:
        return true;
      default:
        return false;
    }
  }
}
export default AppState;
