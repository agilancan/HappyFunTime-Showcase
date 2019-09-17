import React from "react";
import { View, Image, Dimensions, Text, Linking, Alert, YellowBox } from "react-native";
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';


import MainMenu from "../MainMenu/MainMenu";
import Lobby from '../Lobby/Lobby';
import GLOBAL from '../../Globals';

const { GAMESTATE } = GLOBAL;

class App extends React.Component {
    static options(passProps) {
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated'
        ]);
        return {
            statusBar: {
                backgroundColor: "transparent",
                drawBehind: true,
                visible: false,
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
        const { GameReducer } = this.props;
        const { gameState } = GameReducer;
        switch (gameState) {
            case GAMESTATE.LOGIN:
                return (<MainMenu />);
            case GAMESTATE.LOBBY:
                return (<Lobby />)
            default:
                return null;
        }

    }
}
function mapStateToProps(state) {
    const { GameReducer } = state;
    return { GameReducer };
}
export default compose(firestoreConnect(), connect(mapStateToProps))(App);
