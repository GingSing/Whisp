import { GET_USER_INFO_FAILURE, 
    GET_USER_INFO_REQUEST, 
    GET_USER_INFO_SUCCESS, 
    ADD_PLAYLIST_FAILURE, 
    ADD_PLAYLIST_REQUEST, 
    ADD_PLAYLIST_SUCCESS, 
    ADD_SONG_TO_PLAYLIST_SUCCESS,
    ADD_SONG_TO_FAVORITES_SUCCESS,
    REMOVE_SONG_FROM_FAVORITES_SUCCESS,
    REMOVE_SONG_FROM_PLAYLIST_SUCCESS } from './types';
import { UserService } from '../_services';

export function getUserInfo(){
    return dispatch => {
        dispatch(request());
        UserService.getUserInfo()
            .then(info=>{
                let { favorites, name, playlists } = info;
                dispatch(success(favorites, name, playlists));
            })
            .catch(err=>{
                dispatch(failure()); 
                console.log(err);
            });
    }

    function request(){ return { type:GET_USER_INFO_REQUEST }}
    function success(favorites, name, playlists){ return { type:GET_USER_INFO_SUCCESS, favorites, name, playlists }}
    function failure(){ return { type:GET_USER_INFO_FAILURE }}
}

export function addPlaylist(playlistName){
    return dispatch => {
        dispatch(request());
        UserService.addPlaylist(playlistName)
            .then((info)=>dispatch(success(info)))
            .catch(err => {
                dispatch(failure());
                console.log(err);
            });
    }

    function request(){ return { type: ADD_PLAYLIST_REQUEST }}
    function success(info){ return { type: ADD_PLAYLIST_SUCCESS, info }}
    function failure(){ return { type: ADD_PLAYLIST_FAILURE }}
}

export function addSongToPlaylist(songId, playlistName){
    return dispatch => {
        UserService.addSongToPlaylist(songId, playlistName)
            .then((playlists)=>dispatch(success(playlists)))
            .catch(err => {
                console.log(err);
            });
        }
    function success(playlists){ return { type: ADD_SONG_TO_PLAYLIST_SUCCESS, playlists }}
}

export function addSongToFavorites(songId){
    return dispatch => {
        UserService.addSongToFavorites(songId)
            .then((favorites) => {dispatch(success(favorites))})
            .catch(err => {
                console.log(err);
            });
    }
    function success(favorites){ return { type: ADD_SONG_TO_FAVORITES_SUCCESS, favorites }}
}

export function removeSongFromPlaylist(songId, playlistName){
    return dispatch => {
        UserService.removeSongFromPlaylist(songId, playlistName)
            .then((playlists) => {console.log(playlists);dispatch(success(playlists))})
            .catch(err => {
                console.log(err);
            });
    }
    function success(playlists){ return { type: REMOVE_SONG_FROM_PLAYLIST_SUCCESS, playlists }}
}

export function removeSongFromFavorites(songId){
    return dispatch => {
        UserService.removeSongFromFavorites(songId)
            .then((favorites) => {dispatch(success(favorites))})
            .catch(err => {
                console.log(err);
            });
    }
    function success(favorites){ return { type:REMOVE_SONG_FROM_FAVORITES_SUCCESS, favorites }}
}