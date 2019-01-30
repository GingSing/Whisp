import { SET_SONG_AND_LIST, PLAY_MUSIC, STOP_MUSIC, PAUSE_MUSIC, NEXT_SONG, PREVIOUS_SONG, LOOP_SONG, SET_AUDIO, SET_SRC, SET_VOLUME, SET_USER_VOLUME } from '../_actions/types';

let initialState = {
    audio: null,
    playing: false,
    paused: true,
    songList: [],
    songNumber: 0,
    loop: false,
    userVolume: 0.5
}

export default function(state=initialState, action){
    switch(action.type){
        case SET_USER_VOLUME:
            return {
                ...state,
                userVolume: action.volume
            }
        case SET_VOLUME:
            if(state.audio){
                state.audio.volume = action.volume > 1 ? 1 : action.volume;
            }
            return {
                ...state
            }
        case SET_SRC:
            if(state.audio){
                state.audio.src = action.src
            }
            return {
                ...state,
                src: action.src
            }
        case SET_AUDIO:
            return {
                ...state,
                audio: action.audio
            }
        case SET_SONG_AND_LIST:
            return {
                ...state,
                songList: action.songList,
                songNumber: action.songNumber
            }
        case PLAY_MUSIC:
            if(state.audio){
                state.audio.play();
            }
            return {
                ...state,
                playing: true,
                paused: false,
            }
        case STOP_MUSIC:
            if(state.audio){
                state.audio.currentTime=0;
                state.audio.pause();
            }
            return{
                ...state,
                playing: false,
                paused: true
            }
        case PAUSE_MUSIC:
            if(state.audio){
                state.audio.pause();
            }
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
        console.log("previousSong");
            return{
                ...state,
                songNumber: state.songNumber - 1 < 0 ? state.songList.length - 1 : --state.songNumber
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