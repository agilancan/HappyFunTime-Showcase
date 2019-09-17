import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import PlayerCard from "../PlayerCard/PlayerCard";
import { scale } from '../../utility/Scale';

export default class TitleLoading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <PlayerCard transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} />
                    <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} />
                    <PlayerCard borderColor={'#B2DF6D'} backgroundColor={'#B2DF6D'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} />
                    <PlayerCard transform={[{ rotate: '3deg' }]} />
                </View>
                <View style={styles.innerContainer}>
                    <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} />
                    <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#B2DF6D'} backgroundColor={'#B2DF6D'} />
                    <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard />
                    <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} />
                </View>
                <View style={styles.innerContainer}>
                    <PlayerCard transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} />
                    <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard />
                    <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} />
                    <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} transform={[{ rotate: '3deg' }]} />
                </View>
                <View style={styles.innerContainer}>
                    <PlayerCard borderColor={'#B2DF6D'} backgroundColor={'#B2DF6D'} />
                    <PlayerCard transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} />
                    <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} />
                    <PlayerCard transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#B2DF6D'} backgroundColor={'#B2DF6D'} />
                </View>
                <Text style={styles.titleText}>Happy{'\n'}Fun{'\n'}Time</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        margin: '0%',
        padding: '0%',
        justifyContent: 'space-between'
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        margin: '0%',
        padding: '0%',
        justifyContent: 'space-between',
        position: 'relative'
    },
    titleText: {
        color: 'rgba(0, 0, 0, 0.87)',
        flex: 1,
        fontFamily: 'zhang_qa',
        fontSize: scale(159),
        textAlign: 'right',
        letterSpacing: scale(1),
        position: 'absolute',
        paddingLeft: scale(10),
        lineHeight: scale(188)
    }
});
