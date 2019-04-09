import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';


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
        height: 100,
        width: 100,
        borderWidth: 1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 2,
        margin: "3%",
        padding: '0%'
    }
});


//add more props {name, ID}
//transfor -> rotation
//add 'WAITING PLAYER'