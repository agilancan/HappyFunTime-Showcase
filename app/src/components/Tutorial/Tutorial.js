import React from "react";
import { View } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import { Navigation } from 'react-native-navigation';

import TutorialTemplate from './TutorialTemplate';

const tutorial1Img = require('../../../assets/Tutorial1/tutorial1.png');
const tutorial2Img = require('../../../assets/Tutorial2/tutorial2.png');
const tutorial3Img = require('../../../assets/Tutorial3/tutorial3.png');
const tutorial4Img = require('../../../assets/Tutorial4/tutorial4.png');
const tutorial5Img = require('../../../assets/Tutorial5/tutorial5.png');

export default class Tutorial extends React.Component {
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
                    <TutorialTemplate
                        containerText={'JOIN 28 OTHERS IN\nAN ELIMINATION BATTLE'}
                        imgPath={tutorial1Img}
                        pushPage={this.pushPage}
                        barMargins={['33.3%', '0%', '0%', '0%', '0%']} />
                </View>
                <View key="2">
                    <TutorialTemplate containerText={'ASK AND RESPOND\nWITH DRAWINGS'}
                        imgPath={tutorial2Img}
                        pushPage={this.pushPage}
                        barMargins={['33.3%', '33.3%', '0%', '0%', '0%']} />
                </View>
                <View key="3">
                    <TutorialTemplate containerText={'TRY TO GET THE\nMOST VOTES'}
                        imgPath={tutorial3Img}
                        pushPage={this.pushPage}
                        barMargins={['33.3%', '33.3%', '33.3%', '0%', '0%']} />
                </View>
                <View key="4">
                    <TutorialTemplate containerText={'LAST ONE\nALIVE WINS!'}
                        imgPath={tutorial4Img}
                        pushPage={this.pushPage}
                        barMargins={['33.3%', '33.3%', '33.3%', '33.3%', '0%']} />
                </View>
                <View key="5">
                    <TutorialTemplate containerText={'Most importantly...\nrelax...and have fun :)'}
                        imgPath={tutorial5Img}
                        pushPage={this.pushPage}
                        barMargins={['33.3%', '33.3%', '33.3%', '33.3%', '33.3%']} />
                </View>
            </ViewPager>

        );
    }
}