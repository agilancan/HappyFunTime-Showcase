import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import { scale } from '../../utility/Scale';
import GlobalScore from "./GlobalScore.android";
import GLOBAL from '../../Globals';
const { GAMESTATE, DATABASE } = GLOBAL;

// This class determines everything to do with the Question Card
class Leaderboard extends Component {
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

    constructor(props) {
        super(props);
        this.state = {
            topUsers: []
        };
    }

    componentDidMount() {
        const usersRef = firebase
            .firestore()
            .collection(DATABASE.USERS);
        usersRef
            .where('providerId', '==', 'facebook.com')
            .get()
            .then(facebookUsersSnapshot => {
                usersRef
                    .where('providerId', '==', 'google.com')
                    .get()
                    .then(googleUsersSnapshot => {
                        const users = facebookUsersSnapshot._docs.concat(googleUsersSnapshot._docs);
                        this.setState({
                            topUsers: users.sort((a, b) => {
                                return a.points < b.points;
                            })
                        })
                    })
            })
    }

    renderItem = ({ item, index, separators }) => <GlobalScore user={{ ...item.data(), rank: index + 1 }} key={item.data().uid} />

    render() {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer1}>
                    <Text style={styles.innerContainer1Text}>Global leaderboard.</Text>
                </View>
                <View style={styles.innerContainer2}>
                    <FlatList
                        style={{ flex: 1 }}
                        extraData={this.state}
                        data={this.state.topUsers}
                        keyExtractor={(item) => item.uid}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
}
function mapStateToProps(state) {
    const { GameReducer } = state;
    return { GameReducer };
}
export default connect(mapStateToProps)(Leaderboard);

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
        flex: 3,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF"
    },
    innerContainer1Text: {
        fontFamily: 'roboto_condensed_bold_italic',
        fontSize: scale(43),
        color: "rgba(0, 0, 0, 0.87)",
        transform: [{ rotate: '354deg' }],
        marginTop: '20%',
        lineHeight: scale(54),
        letterSpacing: scale(0.1)
    },
    innerContainer2: {
        flex: 6,
        backgroundColor: "#FFFFFF"
    }
});
