const express=require('express');
const router = express.Router();
const userService = require('../../services/userService');

//retrieves user object (set to only have 1 user)
router.get('/getUser', userService.getUser);

//adds a user (requires: only a name) uncomment when need to add user
//router.post('/addUser', userService.addUser);

//adds a playlist to the sole user (requires: only a playlist_name)
router.post('/addPlaylist', userService.addPlaylist);

//adds a song to any playlist (requires: song_id and playlist_name; should i change it to playlist id?)
router.post('/addSongToPlaylist', userService.addSongToPlaylist);

//adds a song to the favorites list (requires: song_id)
router.post('/addSongToFavorites', userService.addSongToFavorites);

router.post('/removeSongFromPlaylist', userService.removeSongFromPlayList);

router.post('/removeSongFromFavorites', userService.removeSongFromFavorites);

module.exports = router;