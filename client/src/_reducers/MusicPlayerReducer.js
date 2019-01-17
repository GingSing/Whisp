import { SET_SONG_AND_LIST, PLAY_MUSIC, STOP_MUSIC, PAUSE_MUSIC, NEXT_SONG, PREVIOUS_SONG, LOOP_SONG } from '../_actions/types';

let initialState = {
    playing: false,
    paused: true,
    songList: [],
    songNumber: 0,
    loop: false
}

export default function(state=initialState, action){
    switch(action.type){
        case SET_SONG_AND_LIST:
            return {
                ...state,
                songList: action.songList,
                songNumber: action.songNumber
            }
        case PLAY_MUSIC:
            return {
                ...state,
                playing: true,
                paused: false,
            }
        case STOP_MUSIC:
            return{
                ...state,
                playing: false,
                paused: true
            }
        case PAUSE_MUSIC:
            return{
                ...state,
                playing: true,
                paused: true
            }
        case NEXT_SONG:
            return{
                ...state,
                songNumber: (state.songNumber + 1 > state.songList.length - 1) ? 0 : ++state.songNumber
            }
        case PREVIOUS_SONG:
            return{
                ...state,
                songNumber: state.songNumber - 1 < 0 ? state.songList.size - 1 : state.songNumber--
            }
        case LOOP_SONG:
            return {
                ...state,
                loop: !state.loop
            }
        default:
            return state;
    }
}