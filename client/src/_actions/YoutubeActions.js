import { DOWNLOAD_SONG_REQUEST, DOWNLOAD_SONG_SUCCESS, DOWNLOAD_SONG_FAILURE } from './types';
import { YoutubeService } from '../_services';

export function downloadSong(url, name, artist){
    return dispatch => {
        dispatch(request(YoutubeService.getMetaData(url)));
        YoutubeService.downloadSong(url, name, artist)
            .then(data => {
                dispatch(success());
            })
            .catch(err => {
                dispatch(failure());
                console.log(err);
            });
    }
    function request(url){ return { type: DOWNLOAD_SONG_REQUEST, url }}
    function success(){ return { type: DOWNLOAD_SONG_SUCCESS }}
    function failure(){ return { type: DOWNLOAD_SONG_FAILURE }}
}