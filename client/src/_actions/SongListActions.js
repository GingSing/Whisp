import { GET_SONGLIST_REQUEST, GET_SONGLIST_SUCCESS, GET_SONGLIST_FAILURE } from './types';
import { SongListService } from '../_services';

export function getSongList(){
    return dispatch => {
        dispatch(request());
        SongListService.getSongList()
            .then(songList =>{ dispatch(success(songList))})
            .catch(err => {
                dispatch(failure());
                console.log(err);
            })

    }
    function request(){ return { type: GET_SONGLIST_REQUEST }}
    function success(songList){ return { type: GET_SONGLIST_SUCCESS, songList }}
    function failure(){ return { type: GET_SONGLIST_FAILURE }}
}