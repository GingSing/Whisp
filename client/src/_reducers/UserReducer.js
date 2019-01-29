import { GET_USER_INFO_FAILURE, 
        GET_USER_INFO_REQUEST, 
        GET_USER_INFO_SUCCESS, 
        ADD_PLAYLIST_REQUEST, 
        ADD_PLAYLIST_FAILURE, 
        ADD_PLAYLIST_SUCCESS,
        ADD_SONG_TO_FAVORITES_FAILURE,
        ADD_SONG_TO_FAVORITES_REQUEST,
        ADD_SONG_TO_FAVORITES_SUCCESS,
        ADD_SONG_TO_PLAYLIST_FAILURE,
        ADD_SONG_TO_PLAYLIST_REQUEST,
        ADD_SONG_TO_PLAYLIST_SUCCESS } from '../_actions/types';

let initialState = {
    favorites: null,
    name: "",
    playlists: null,
    addingPlaylist: false
}

export default function(state=initialState, action){
    switch(action.type){
        //not sure if need these requests
        case ADD_SONG_TO_FAVORITES_REQUEST:
            return {
                ...state,
                addingSongToFavorites: true
            }
        case ADD_SONG_TO_FAVORITES_SUCCESS:
            return {
                ...state,
                addingSongToFavorites: false,
                favorites: action.favorites
            }
        case ADD_SONG_TO_FAVORITES_FAILURE:
            return {
                ...state,
                addingSongToFavorites: false
            }
        case ADD_SONG_TO_PLAYLIST_REQUEST:
            return {
                ...state,
                addingSongToPlaylist: true
            }
        case ADD_SONG_TO_PLAYLIST_SUCCESS:
            console.log(action.playlists);
            return {
                ...state,
                addingSongToPlaylist: false,
                playlists: action.playlists
            }
        case ADD_SONG_TO_PLAYLIST_FAILURE:
            return{
                ...state,
                addingSongToPlaylist: false
            }
        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                gettingUserInfo: true
            }
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                gettingUserInfo: false,
                favorites: action.favorites,
                name: action.name,
                playlists: action.playlists
            }
        case GET_USER_INFO_FAILURE:
            return {
                ...state,
                gettingUserInfo: false
            }
        case ADD_PLAYLIST_REQUEST:
            return {
                ...state,
                addingPlaylist: true
            }
        case ADD_PLAYLIST_SUCCESS:
            return {
                ...state,
                addingPlaylist: false,
                playlists: action.playlists
            }
        case ADD_PLAYLIST_FAILURE:
            return {
                ...state,
                addingPlaylist: false
            }
        default:
            return state;
    }
}