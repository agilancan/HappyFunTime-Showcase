import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import PlayerCard from "../PlayerCard/PlayerCard";


// This class determines everything to do with the Question Card
export default class MainMenu extends Component {
    static options(passProps) {
        return {
            statusBar: {
                backgroundColor: "transparent",
                drawBehind: true,
                visible: true,
                style: "dark"
            },
            topBar: {
                visible: false,
                drawBehind: true,
                animate: false
            },
            passProps
        };
    }

    render() {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer1}>
                    <Text style={styles.innerContainer1Text}>Breath in ... breath out{'/n'}… good ... draw … :)</Text>
                    <View style={styles.innerContainer1Right}>
                        <View style={styles.innerContainer1Box}><PlayerCard style={{margin: 10}}/></View>
                        <Image style={styles.leaderboard} source={require('../../../assets/Leaderboard/round_list_black_18dp.png')} />
                    </View>  
                </View>
                <View style={styles.innerContainer2}>
                    <Image style={styles.leaderboard} source={require('../../../assets/Play/round_play_circle_filled_black_48dp.png')} />  
                </View>
                <View style={styles.innerContainer3}>
                    <TouchableOpacity style={styles.innerContainer3Box} onPress={()=> alert('This works!!!!')}>
                        <Text style={styles.innerContainer3Text}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>  
                <View style={styles.innerContainer4}>
                    <TouchableOpacity style={styles.innerContainer4Facebook} onPress={() => alert('This works!!!!')}>
                        <Text style={styles.innerContainer3Text}>F</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={styles.innerContainer4Google} onPress={() => alert('This works!!!!')}>
                        <Text style={styles.innerContainer3Text}>G</Text>
                    </TouchableOpacity>    
                </View>
                <View style={styles.innerContainer5}>  
                    <TouchableOpacity style={styles.innerContainer5Button} onPress={() => alert('This works!!!!')}>
                        <Text style={styles.innerContainer5Text}>CREATE ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.innerContainer6}>
                    <View style={styles.innerContainer6Thin1}/>  
                    <View style={styles.innerContainer6Thin2}/>  
                    <View style={styles.innerContainer6Thin3}/>  
                    <View style={styles.innerContainer6Thin4}/>  
                    <View style={styles.innerContainer6Thin5}/>  
                </View>
            </View>
        );
    }
}


// All the styles
const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        margin: "0%",
        padding: "0%"
    },
    innerContainer1: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer1Right: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        //justifyContent: "center",
        alignItems: "center",
    },
    innerContainer1Text: {
        flex: 2,
        flexDirection: 'row',
        color: "#000000",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'Roboto',
        fontSize: 25,
        fontWeight: 'bold'
    },
    innerContainer1Box: {
        flex: 1,
        flexDirection: 'row',
        resizeMode: 'contain',
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1,
        margin: 10,
        //padding: 10
    },
    leaderboard: {
        flex: 2,
        aspectRatio: 1,
    },
    innerContainer2: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer3: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer3Box: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderRadius: 21,
        borderColor: "black",
        borderStyle: "dashed",
        aspectRatio: 1,
        margin: 10,
        height: 42,
        width: 150
    },
    innerContainer3Text: {
        flex: 2,
        flexDirection: 'row',
        color: "black",
        justifyContent: "center",
        alignItems: "center",
        //fontFamily: 'Roboto',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    innerContainer4: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer4Facebook: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderRadius: 21,
        borderColor: "black",
        borderStyle: "dashed",
        margin: 10,
        height: 42,
        width: 42
    },
    innerContainer4Google: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderColor: "black",
        borderStyle: "dashed",
        margin: 10,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
    innerContainer5: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer5Button: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        height: 50,
        width: 150,
        //paddingTop: 100
    },
    innerContainer5Text: {
        flexDirection: 'row',
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        //lineHeight: 19,
        //letterSpacing: 60
    },
    innerContainer6: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        paddingTop: 10,
        paddingLeft: 100,
        paddingRight: 100,
    },
    innerContainer6Thin1: {
        flex: 1,
        backgroundColor: "#F3CBFF",
        height: '100%',
        width: '30%',
        marginTop: '50%'
    },
    innerContainer6Thin2: {
        flex: 1,
        backgroundColor: "#B2DF6D",
        height: '100%',
        width: '30%',
        marginTop: '50%'
    },
    innerContainer6Thin3: {
        flex: 1,
        backgroundColor: "#FFC767",
        height: '100%',
        width: '30%',
        marginTop: '50%'
    },
    innerContainer6Thin4: {
        flex: 1,
        backgroundColor: "#94E5FF",
        height: '100%',
        width: '30%',
        marginTop: '50%'
    },
    innerContainer6Thin5: {
        flex: 1,
        backgroundColor: "#FFE66A",
        height: '100%',
        width: '30%',
        marginTop: '50%'
    },
});
