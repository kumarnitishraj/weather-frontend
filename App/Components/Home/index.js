/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    NetInfo

} from 'react-native';

import { Colors } from '../../../Config/Constants'

import { Circle } from '../Circle'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";

import { Metrics, FontSize } from '../../../Config/Constants'
import { getWeatherInfo } from '../../redux/actions/home';
import { data } from '../../../Config/Data'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const WeatherList = ({ data, onPress }) => {
    //console.log(data)
    return(
        <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center',height:40}}
            onPress={onPress}
        >
            <View style = {{flex:1,}} >
                <Text style={styles.listText} >
                    {data.day_name}
                </Text>
            </View>
            <View style = {{flex:0.5,justifyContent:'center',alignItems:'center'}} >
                <Image
                    source={require('../../Assets/cloudy-black.png')}
                    style = {{height:22,width:22}}
                />
            </View>
            <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
                <Text style={styles.listText} >
                    {data.temperature}
                </Text>
                <Circle
                    size={7}
                    borderColor={Colors.GENERIC_TEXT_COLOR_BLACK}
                    top={10}
                    borderWidth={1.5}
                />
            </View>
        </TouchableOpacity>
    )
}
const WeatherListToday = ({ data,onPress }) => {
    //console.log(data)
    return (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}
        onPress = {onPress}
        >
            <View style={{ flex: 1, }} >
                <Text style={styles.listTextToday} >
                    {'Today'}
                </Text>
            </View>
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }} >
                <Image
                    source={require('../../Assets/cloudy.png')}
                    style={{ height: 18, width: 18 }}
                />
            </View>
            <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                <Text style={styles.listTextToday} >
                    {data.temperature}
                </Text>
                <Circle
                    size={7}
                    borderColor={Colors.GENERIC_TEXT_COLOR}
                    top={10}
                    borderWidth={1.5}
                />
            </View>
        </TouchableOpacity>
    )
}
class HomeView extends Component {
    constructor(props){
        super(props)

    }
    componentDidMount(){
        const { getWeatherInfo } = this.props;


        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                getWeatherInfo();
                this.setState({ status: isConnected });
                }
        );
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        console.log(`is connected: ${this.state.status}`);
    }

    showListView = (rowData,i) =>{
        const { navigation } = this.props;
        if(i==0){
            return (
                <WeatherListToday
                    data = {rowData}
                    onPress={() => navigation.navigate('Detail',{detail:rowData})}
                />
            )
        }
        return(
            <WeatherList
                data={rowData}
                onPress={() => navigation.navigate('Detail',{detail:rowData})}
            />
        )
    }

    render() {

        const { Home, navigation } = this.props;
        var aboutToday = {
            temperature:'23',
            weather:'Sunny'
        } ;
        var datalist = [{}]
        if(!!Home.loaded){
            aboutToday = Home.weather[0];
            datalist = Home.weather;
        }else{
            datalist = data;
            aboutToday = data[0]
        }
        var  dataSource = ds.cloneWithRows(datalist)


        return (
            <View style={styles.container}>
                <View style={{ flex: 7, }}>
                    <LinearGradient
                        colors={[Colors.GRADIENT_COLOR_LIGHT, Colors.GRADIENT_COLOR_DARK]}
                        style={{ flex: 1,flexDirection:'column',}}
                    >
                    <Text style={{
                        fontSize:FontSize.LOCATION_NAME,
                        fontWeight:FontSize.LOCATION_NAME_WEIGHT,
                        marginLeft:80,
                        backgroundColor:'rgba(0,0,0,0)',
                        color:'#fff',
                        marginTop:50,
                        }} >{'Bangalore'}</Text>
                    <Text style={{
                        fontSize: FontSize.WEATHER,
                        marginLeft: 80,
                        fontFamily: 'Chalkboard SE',
                        backgroundColor: 'rgba(0,0,0,0)',
                        color: '#fff',
                        marginTop: 10,
                    }} >
                            {aboutToday.weather}
                    </Text>
                    <View style = {{flexDirection:'row'}} >
                    <TouchableOpacity onPress = {()=>this.call()} >
                    <Text style={{
                        fontSize: FontSize.TEMPERATURE,
                        marginLeft: 80,
                        fontWeight: FontSize.LIST_WEIGHT,
                        backgroundColor: 'rgba(0,0,0,0)',
                        color: '#fff',
                        marginTop: 10,
                                }} >{aboutToday.temperature}</Text></TouchableOpacity>
                    <Circle
                        size={10}
                        borderColor={'#fff'}
                        top={-30}
                        borderWidth={3}
                    />
                    </View>

                    <Image
                            source={require('../../Assets/weather.png')}
                            style = {{height:150,width:150,position:'absolute',bottom:-20,right:0}}
                    />
                    </LinearGradient>
                </View>
                <View style={{ flex: 4, backgroundColor: '#fff' }}>

                    <ListView
                        dataSource={dataSource}
                        renderRow={(rowData,j, i) => this.showListView(rowData,i)}
                    />
                </View>
            </View>
        );
   }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Home: state.Home,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getWeatherInfo: () => {
            dispatch(getWeatherInfo())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listText: {
        marginLeft: 30,
        fontSize: FontSize.LIST,
        fontWeight: FontSize.LIST_WEIGHT,
        color: Colors.GENERIC_TEXT_COLOR_BLACK,
    },
    listTextToday: {
        marginLeft: 30,
        fontSize: FontSize.LIST,
        fontWeight: FontSize.LIST_WEIGHT,
        color: Colors.GENERIC_TEXT_COLOR,
    },
    listView: {
        height: 150,
        justifyContent: 'center',
    },

});
