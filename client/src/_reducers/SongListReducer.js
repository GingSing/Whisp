import { GET_SONGLIST_REQUEST, GET_SONGLIST_SUCCESS, GET_SONGLIST_FAILURE } from '../_actions/types';

let initialState = {
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_SONGLIST_REQUEST:
            return {
                ...state,
                gettingSongList: true
            }
        case GET_SONGLIST_SUCCESS:
            return {
                ...state,
                songList: action.songList,
                gettingSongList: false
            }
        case GET_SONGLIST_FAILURE:
            return {
                ...state,
                gettingSongList: false
            }
        default:
            return state;
    }
}