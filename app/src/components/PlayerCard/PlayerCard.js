import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import { scale } from '../../utility/Scale';


// This class determines everything to do with the Posted Notes
export default class PlayerCard extends Component {
    render() {
        return (
            <View style={{ ...styles.postedNote, backgroundColor: this.props.backgroundColor, borderColor: this.props.borderColor, transform: this.props.transform }} />
        );
    }
}


// Setting up prop types
PlayerCard.defaultProps = {
    backgroundColor: "#94E5FF",
    borderColor: "#94E5FF",
    transform: [{ rotate: '0deg' }]
}

PlayerCard.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    borderColor: PropTypes.string.isRequired,
    transform: PropTypes.any.isRequired
};


// All the styles
const styles = StyleSheet.create({
    postedNote: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1,
        height: scale(100),
        width: scale(100),
        borderWidth: scale(1),
        borderTopLeftRadius: scale(0),
        borderTopRightRadius: scale(1),
        borderBottomLeftRadius: scale(5),
        margin: "3%",
        padding: '0%'
    }
});


//add more props {name, ID}
//transfor -> rotation
//add 'WAITING PLAYER'