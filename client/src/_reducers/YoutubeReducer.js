import { DOWNLOAD_SONG_FAILURE, DOWNLOAD_SONG_REQUEST, DOWNLOAD_SONG_SUCCESS } from '../_actions/types';

let initialState = {
    metaData: null,
    downloadingSong: false,
    downloadedSong: false
}

export default function(state=initialState, action){
    switch(action.type){
        case DOWNLOAD_SONG_REQUEST:
            return {
                ...state,
                metaData: action.metaData,
                downloadingSong: true,
                downloadedSong: false
            }
        case DOWNLOAD_SONG_SUCCESS:
            return {
                ...state,
                downloadingSong: false,
                downloadedSong: true
            }
        case DOWNLOAD_SONG_FAILURE:
            return {
                ...state,
                downloadingSong: false,
                downloadedSong: false
            }
        default:
            return state;
    }
}