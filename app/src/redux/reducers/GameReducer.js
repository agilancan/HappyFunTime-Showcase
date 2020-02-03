import GLOBAL from '../../Globals';
const GameReducer = (
    state = {
        profile: undefined,
        showAd: false,
        gameState: GLOBAL.GAMESTATE.LOGIN,
        users: [],
        lobbyInfo: {
            hostUserID: undefined,
            currentQ: '',
            users: [],
            round: 0,
            status: undefined,
            inGame: true,
            state: 0
        }
    },
    action
) => {
    switch (action.type) {
        case 'SET_PROFILE': {
            return {
                ...state,
                profile: action.profile
            };
        }
        case 'TOGGLE_AD': {
            return {
                ...state,
                showAd: action.showAd
            };
        }
        case 'SET_GAME_STATE': {
            return {
                ...state,
                gameState: action.gameState
            };
        }
        case 'SET_GAME_STATE_LOBBY': {
            return {
                ...state,
                gameState: GLOBAL.GAMESTATE.LOBBY
            };
        }
        case 'SET_LOBBY_INFO': {
            return {
                ...state,
                lobbyInfo: action.lobbyInfo
            }
        }
        case 'SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        default:
            return state;
    }
};
export default GameReducer;