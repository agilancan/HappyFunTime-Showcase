import React, { Component } from 'react';
import {View, Image, Dimensions, Text, Linking } from "react-native";
// import LobbyGame from "./Lobby";
// import QuestionCard from "./QuestionCard";
// import AnswerCard from "./AnswerCard";
// import AnswerCardPicked from "./AnswerCardPicked";
// import TitleLoading from "./TitleLoading";
import DrawCard from "../DrawCard/DrawCard";


export default class Welcome extends React.Component {
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
            //<Lobby />
            //<QuestionCard />  
            //<AnswerCard />  
            //<AnswerCardPicked />  
            //<TitleLoading />  
            <DrawCard />
        );
    }
}

