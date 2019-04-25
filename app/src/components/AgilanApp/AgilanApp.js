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
import LogginPassword from "../LogginPassword/LogginPassword";
import LogginPasswordForgot from "../LogginPasswordForgot/LogginPasswordForgot";
import AccountEmail from "../AccountEmail/AccountEmail";
import AccountPassword from "../AccountPassword/AccountPassword";
import AccountExist from "../AccountExist/AccountExist";
import GlobalScore from "../Leaderboard/GlobalScore";
import Leaderboard from "../Leaderboard/Leaderboard";
import Tutorial1 from "../Tutorial1/Tutorial1";
import Tutorial2 from "../Tutorial2/Tutorial2";
import Tutorial3 from "../Tutorial3/Tutorial3";
import Tutorial4 from "../Tutorial4/Tutorial4";
import Tutorial5 from "../Tutorial5/Tutorial5";


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
      //<MainMenu />
      //<AccountName />
      //<LogginPassword />
      //<LogginPasswordForgot />
      //<AccountEmail />
      //<AccountPassword /> //Need to add the back button
      //<AccountExist /> //Need to add back button
      //<GlobalScore />
      //<Leaderboard /> //Need to add back button
      //<Tutorial1 /> 
      //<Tutorial2 /> 
      //<Tutorial3 /> 
      //<Tutorial4 /> 
      <Tutorial5 /> 
    );
  }
}
