const express=require('express');
const router = express.Router();
const songService = require('../../services/songService');

// retrieves the song, but isn't very useful at the moment until i add rate limiting?
router.get('/getSong', songService.getSong);

//returns a list of songs in db
router.get('/getSongList', songService.getSongList);

//downloads the youtube audio (require: youtube full link)
router.post('/downloadSong', songService.downloadSong);

module.exports = router;