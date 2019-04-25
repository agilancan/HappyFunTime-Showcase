import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import { scale } from '../../utility/Scale';



// This class determines everything to do with the Question Card
export default class Tutorial1 extends Component {
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
                    <Image style={styles.tutorial1} source={require('../../../assets/Tutorial1/tutorial1.png')} />                         
                </View>
                <View style={styles.innerContainer2}>
                    <Text style={styles.innerContainer2Text}>JOIN 28 OTHERS IN{'\n'}AN ELIMINATION BATTLE</Text>
                </View>
                <View style={styles.innerContainer6}>
                    <View style={styles.innerContainer6Thin1}/>  
                    <View style={styles.innerContainer6Thin2}/>  
                    <View style={styles.innerContainer6Thin3}/>  
                    <View style={styles.innerContainer6Thin4}/>  
                    <View style={styles.innerContainer6Thin5}/>  
                </View>
                <View>
                    <TouchableOpacity>
                        <View style={styles.floatingActionButton} />
                    </TouchableOpacity>
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
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    innerContainer1: {
        flex: 8,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginTop: scale(60),
        marginLeft: scale(5),
        marginRight: scale(5),
        borderWidth: scale(4),
        borderRadius: scale(30),
        borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    tutorial1: {
        flex: 3,
        resizeMode: 'cover',
        margin: scale(10),
        aspectRatio: 0.8
    },
    innerContainer2: {
        flex: 2,
        justifyContent: 'center'
    },
    innerContainer2Text: {
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: scale(14),
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: scale(3),
        lineHeight: scale(21),
    },
    innerContainer6: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        paddingTop: '0%',
        paddingLeft: '27%',
        paddingRight: '27%',
    },
    innerContainer6Thin1: {
        flex: 1,
        backgroundColor: "#F3CBFF",
        height: '100%',
        width: '30%',
        marginTop: '33.3%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    innerContainer6Thin2: {
        flex: 1,
        backgroundColor: "#B2DF6D",
        height: '100%',
        width: '30%',
        marginTop: '0%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    innerContainer6Thin3: {
        flex: 1,
        backgroundColor: "#FFC767",
        height: '100%',
        width: '30%',
        marginTop: '0%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    innerContainer6Thin4: {
        flex: 1,
        backgroundColor: "#94E5FF",
        height: '100%',
        width: '30%',
        marginTop: '0%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    innerContainer6Thin5: {
        flex: 1,
        backgroundColor: "#FFE66A",
        height: '100%',
        width: '30%',
        marginTop: '0%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    floatingActionButton: {
        width: scale(56),
        height: scale(56),
        borderRadius: scale(30),
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
        position: 'absolute',
        bottom: scale(16.9),
        right: scale(1),
    },
});
