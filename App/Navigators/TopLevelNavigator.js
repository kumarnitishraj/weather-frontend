import { StackNavigator } from 'react-navigation';
import ConnectedHome from '../Containers/ConnectedHome'


const TopLevelRouter = {
    ConnectedHome: { screen: ConnectedHome },
};


const TopLevelNavigator = StackNavigator(TopLevelRouter, {
    initialRouteName: 'ConnectedHome',
    mode: 'card',
    headerMode: 'screen',
    navigationOptions: {
        gesturesEnabled: false,
        header:null,
    },
});

export default TopLevelNavigator;



