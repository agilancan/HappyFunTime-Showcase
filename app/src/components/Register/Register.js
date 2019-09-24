import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { firestoreConnect } from 'react-redux-firebase';
import ViewPager from "@react-native-community/viewpager";
import { Navigation } from 'react-native-navigation';

import RegisterTemplate from './RegisterTemplate';
import { scale, verticalScale } from '../../utility/Scale';


export default class Register extends Component {
    static options(passProps) {
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

    constructor(props) {
        super(props);
        this.state = {
            currentPageIndex: 0
        };
    }

    pushPage = () => {
        const { currentPageIndex } = this.state;
        const { componentId } = this.props;
        if (currentPageIndex === this.pages.props.children.length - 1) {
            Navigation.push(componentId, {
                component: {
                    name: 'DrawAvatar'
                }
            })
        } else {
            const pageIndex = this.pages.props.children.length > currentPageIndex + 1
                ? currentPageIndex + 1 : currentPageIndex;
            this.setState({ currentPageIndex: pageIndex });
            this.pages.setPage(pageIndex);
        }

    }

    render() {
        return (
            <ViewPager
                ref={(ref) => {
                    if (this.pages === undefined) {
                        this.pages = ref;
                    }
                }}
                style={{ flex: 1 }}
                initialPage={0}
                scrollEnabled={false}>
                <View key="1">
                    <RegisterTemplate
                        titleText={"What's your name?"}
                        textInputPlaceholder={'DISPLAY NAME'}
                        pushPage={this.pushPage}
                        barMargins={['150%', '100%', '100%']}
                        type="name" />
                </View>
                <View key="2">
                    <RegisterTemplate
                        titleText={"What's your email?"}
                        textInputPlaceholder={'EMAIL ADDRESS'}
                        pushPage={this.pushPage}
                        barMargins={['150%', '150%', '100%']}
                        type="email" />
                </View>
                <View key="3">
                    <RegisterTemplate
                        titleText={"Create a password."}
                        textInputPlaceholder={undefined}
                        pushPage={this.pushPage}
                        barMargins={['150%', '150%', '150%']}
                        type="password" />
                </View>
            </ViewPager>
        );
    }
}
