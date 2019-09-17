import React from "react";
import { View, Image, Dimensions, Text, Linking, YellowBox } from "react-native";
import MainMenu from "../MainMenu/MainMenu";
import { isEmpty, firestoreConnect } from 'react-redux-firebase';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';

@firestoreConnect()
export default class App extends React.Component {
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

    signInAnonymously = () => {
        return this.props.firebase
            .auth()
            .signInAnonymously()
            .then((user) => {
                console.log('anonymous user: ', user);
                Navigation.push(this.props.componentId, {
                    component: {
                        name: 'Tutorial'
                    }
                });
            });
    }

    render() {
        return (
            <MainMenu signInAnonymously={this.signInAnonymously} />
        );
    }
}
