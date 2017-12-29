import React, { Component } from "react";
import { View } from "react-native";
import Home from "../../Components/Home";
import Detail from '../../Components/Detail';
import TopBar from '../../Components/TapBar'

import { StackNavigator, NavigationActions } from "react-navigation";



const ConnectedRouter = {
    Home: { screen: Home },
    Detail: { screen: Detail },
    
};

const ConnectedNavigator = StackNavigator(ConnectedRouter, {
    initialRouteName: "Home",
    mode: "card",
    headerMode: "screen",
    navigationOptions: { header: null }
});

export default class ConnectedHome extends Component {
    render() {
        return (
            <View style={{ flex: 1}} >
                <TopBar />
                <ConnectedNavigator  />
            </View>
        );
    }
}
