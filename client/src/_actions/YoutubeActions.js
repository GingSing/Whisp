import { DOWNLOAD_SONG_REQUEST, DOWNLOAD_SONG_SUCCESS, DOWNLOAD_SONG_FAILURE } from './types';
import { YoutubeService } from '../_services';

export function downloadSong(url, name, artist){
    return dispatch => {
        dispatch(request());
        YoutubeService.downloadSong(url, name, artist)
            .then(data => {
                dispatch(success());
                console.log(data);
            })
            .catch(err => {
                dispatch(failure());
                console.log(err);
            });
    }
    function request(){ return { type: DOWNLOAD_SONG_REQUEST }}
    function success(){ return { type: DOWNLOAD_SONG_SUCCESS }}
    function failure(){ return { type: DOWNLOAD_SONG_FAILURE }}
}