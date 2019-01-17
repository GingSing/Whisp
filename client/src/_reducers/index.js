import { combineReducers } from 'redux';
import MusicPlayerReducer from './MusicPlayerReducer';
import UserReducer from './UserReducer';
import SongListReducer from './SongListReducer';
import YoutubeReducer from './YoutubeReducer';

export default combineReducers({
    music: MusicPlayerReducer,
    user: UserReducer,
    songList: SongListReducer,
    youtube: YoutubeReducer
});