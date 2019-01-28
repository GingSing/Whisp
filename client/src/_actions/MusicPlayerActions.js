import { SET_SONG_AND_LIST, PLAY_MUSIC, STOP_MUSIC, PAUSE_MUSIC, NEXT_SONG, PREVIOUS_SONG, LOOP_SONG, SET_AUDIO, SET_SRC, SET_VOLUME, SET_USER_VOLUME } from './types';

export function setVolume(volume){
    return dispatch => {
        dispatch({type: SET_VOLUME, volume});
    }
}

export function setUserVolume(volume){
    return dispatch => {
        dispatch({type: SET_USER_VOLUME, volume});
    }
}

export function setAudio(audio){
    return dispatch => {
        dispatch({type: SET_AUDIO, audio});
    }
}

export function setSrc(src){
    return dispatch => {
        dispatch({type: SET_SRC, src});
    }
}

export function setSong(songNumber, songList){
    return dispatch => {
        dispatch({type: SET_SONG_AND_LIST, songNumber, songList});
    }
}

export function play(){
    return dispatch => {
        dispatch({type: PLAY_MUSIC});
    }
}

export function stop(){
    return dispatch => {
        dispatch({type: STOP_MUSIC});
    }
}

export function pause(){
    return dispatch => {
        dispatch({type: PAUSE_MUSIC});
    }
}

export function nextSong(){
    return dispatch => {
        dispatch({type: NEXT_SONG});
    }
}

export function prevSong(){
    return dispatch => {
        dispatch({type: PREVIOUS_SONG});
    }
}

export function loopSong(){
    return dispatch => {
        dispatch({type: LOOP_SONG})
    }
}