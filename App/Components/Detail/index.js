/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Circle } from '../Circle'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    NetInfo,


} from 'react-native';

import { save } from '../../redux/network'

import { Colors, FontSize } from '../../../Config/Constants'
import LinearGradient from 'react-native-linear-gradient';

class Button extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.ButtonView} onPress={this.props.onPress}>
                <Text style={styles.ButtonText}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default class Home extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { getWeatherInfo } = this.props;


        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

        NetInfo.isConnected.fetch().done(
            (isConnected) => {
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

    saveToDatabase = (detail) =>{
        if(!!this.state.status){
            save(detail).then(res => {
                console.log(res)
            }).catch(error => {
                console.error(error)
            })
        }

    }

    render() {

        const { navigation } = this.props;

        const { detail } = navigation.state.params;
        //console.log(detail)
        return (
            <View style={styles.container}>

                <View style={{ flex: 8,flexDirection:'column' }}>
                <LinearGradient
                    colors={[Colors.GRADIENT_COLOR_LIGHT, Colors.GRADIENT_COLOR_DARK]}
                    style = {{flex:1}}
                >
                <TouchableOpacity onPress = {()=> navigation.goBack()}
                  style = {{position:'absolute',top:2}}
                >
                  <Image
                  style = {{height:25,width:25,}}
                  source = {require('../../Assets/back.png')}
                  />
                </TouchableOpacity>

                    <View style={{ flex: 6, flexDirection: 'column' }}>

                        <View style={{
                            flex: 1,
                            alignItems:'center',
                            justifyContent:'center'
                            }}>
                            <Text style={{
                              fontSize: FontSize.LOCATION_NAME,
                              fontWeight:FontSize.LIST_WEIGHT,
                              fontFamily:'AppleSDGothicNeo-Bold',
                              color:Colors.GENERIC_TEXT_COLOR_WHITE
                            }} >
                                {'Banglore'}
                            </Text>
                            <Text style={{ fontSize: FontSize.WEATHER, fontFamily: 'Chalkboard SE', color: Colors.GENERIC_TEXT_COLOR_WHITE }} >
                                {detail.weather}
                            </Text>
                        </View>
                        <View style={{
                            flex: 1.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection:'row',
                             }}>
                            <Text style={{
                                fontSize:FontSize.TEMPERATURE,
                                fontFamily: 'ArialHebrew',
                                color: Colors.GENERIC_TEXT_COLOR_WHITE,
                                }} >
                                    {detail.temperature}
                            </Text>
                            <Circle
                            size={10}
                            borderColor = {Colors.GENERIC_TEXT_COLOR_WHITE}
                            top = {30}
                            borderWidth={3}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 4,flexDirection:'column' }}>
                        <View style={styles.midView} >
                            <View style={styles.midTextView} >
                                <Text style={styles.midText} >{detail.day_name}</Text>
                            </View>
                            <View style={styles.midTextViewRight} >
                                    <Text style={styles.midText} >{detail.time}</Text>
                            </View>
                        </View>
                        <View style={styles.midView} >
                            <View style={styles.midTextView} >
                                <Text style={styles.midText} >{'Expected Temperture'}</Text>
                            </View>
                            <View style={styles.midTextViewRight} >
                                    <Text style={styles.midText} >{detail.temperature}</Text>
                                <Circle
                                    size={5}
                                    borderColor={Colors.GENERIC_TEXT_COLOR}
                                    top={7}
                                    borderWidth={1.5}
                                />
                            </View>
                        </View>
                        <View style={styles.midView} >
                            <View style={styles.midTextView} >
                                <Text style={styles.midText} >{'Weather'}</Text>
                            </View>
                            <View style={styles.midTextViewRight} >
                                    <Text style={styles.midText} >{detail.weather}</Text>
                            </View>
                        </View>
                        <View style={styles.midView} >

                        </View>
                    </View>
                    <Button
                        text={'Send To Database'}
                        onPress={() =>this.saveToDatabase(detail) }
                    />
                    </LinearGradient>
                </View>
                <View style={{ flex: 2 }}>

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.TRANSPRANT_BLACK,
    },
    midView: {
        flex: 1,
        flexDirection: 'row',
    },
    midTextViewRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
    },
    midTextView: {
        flex: 1.8,
        marginLeft:15,
        justifyContent: 'center'
    },
    midText:{
        color:Colors.GENERIC_TEXT_COLOR,
        fontSize:FontSize.DETAIL,
        fontWeight:FontSize.DETAIL_WEIGHT
    },
    ButtonText: {
        padding: 10,
        color: Colors.GENERIC_TEXT_COLOR,
        fontSize:FontSize.LIST,
        fontWeight:FontSize.LIST_WEIGHT
    },
    ButtonView: {
        marginTop: 40,
        // top:-100,
        marginBottom: 30,
        shadowColor: 'gray',
        position:'relative',
        shadowOpacity: 1,
        shadowOffset: { width: 1, height: 1 },
        marginLeft: 50,
        marginRight: 50,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        borderColor: '#fff',
        borderWidth: 1,
        // height: 50,
        bottom: -55,
        overflow:'hidden',
    },

});
