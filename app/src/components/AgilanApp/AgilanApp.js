import React from "react";
import { View, Image, Dimensions, Text, Linking } from "react-native";
import Lobby from "../Lobby/Lobby";
import QuestionCard from "../QuestionCard/QuestionCard";
import MainMenu from "../MainMenu/MainMenu";
import AnswerCard from "../AnswerCard/AnswerCard";
import AnswerCardPicked from "../AnswerCardPicked/AnswerCardPicked";
import TitleLoading from "../TitleLoading/TitleLoading";
import DrawCard from "../DrawCard/DrawCard";
import AccountName from "../AccountName/AccountName";

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
      //<DrawCard />
      <MainMenu />
      //<AccountName />
    );
  }
}
