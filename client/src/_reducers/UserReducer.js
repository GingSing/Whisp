import { GET_USER_INFO_FAILURE, GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS } from '../_actions/types';

let initialState = {
    userInfo:{}
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
        default:
            return state;
    }
}