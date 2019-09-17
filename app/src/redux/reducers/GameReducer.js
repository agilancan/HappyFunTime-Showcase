import GLOBAL from '../../Globals';
const GameReducer = (
    state = {
        gameState: GLOBAL.GAMESTATE.LOGIN
    },
    action
) => {
    switch (action.type) {
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
        default:
            return state;
    }
};
export default GameReducer;