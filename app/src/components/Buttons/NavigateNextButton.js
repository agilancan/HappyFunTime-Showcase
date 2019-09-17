import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { scale } from '../../utility/Scale';

export const NavigateNextBlackCircle56 = (onPress) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.floatingActionButton56}>
            <Icon name="navigate-next" size={scale(30)} color="#FFF" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    floatingActionButton56: {
        width: scale(56),
        height: scale(56),
        borderRadius: scale(30),
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
        position: 'absolute',
        bottom: scale(16.9),
        right: scale(1),
        justifyContent: 'center',
        alignItems: 'center'
    }
});