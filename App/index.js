import TopLevelNavigator from "./Navigators/TopLevelNavigator";
import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
const store = configureStore();

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TopLevelNavigator />
      </Provider>
    );
  }
}

export default App;
