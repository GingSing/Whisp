import { GET_USER_INFO_FAILURE, GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, ADD_PLAYLIST_REQUEST, ADD_PLAYLIST_FAILURE, ADD_PLAYLIST_SUCCESS } from '../_actions/types';

let initialState = {
    userInfo:{},
    addingPlaylist: false
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                gettingUserInfo: true
            }
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                gettingUserInfo: false,
                userInfo: action.info
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
                userInfo: action.info
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