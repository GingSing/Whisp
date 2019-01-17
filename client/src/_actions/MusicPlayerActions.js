import { SET_SONG_AND_LIST, PLAY_MUSIC, STOP_MUSIC, PAUSE_MUSIC, NEXT_SONG, PREVIOUS_SONG, LOOP_SONG } from './types';

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