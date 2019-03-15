const User = require('../models/User');
const MLAB_USER_ID = process.env.MLAB_USER_ID;

const getUser = (req, res) => {
    User.findOne({_id: MLAB_USER_ID})
        .populate('playlists.songs')
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
}

const addUser = (req, res) => {
    let { name } = req.body;

    let newUser = new User({
        name: name,
        favorites: [],
        playlists: [],
    });

    newUser.save((err, user) => {
        if(err){ 
            console.log(err); 
        }else{
            res.status(200).json(user);
            console.log("User created");
        }
    })
}

const addPlaylist = (req, res) => {
    let { playlist_name } = req.body;
    User.findOne({_id: MLAB_USER_ID})
        .then(user => {
            user.playlists.push({
                name: playlist_name,
                song: []
            })
            user.save();
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
}

const addSongToPlaylist = (req, res) => {
    let { playlist_name, song_id } = req.body;
    User.findOne({_id: MLAB_USER_ID})
        .then(user => {
            let selected_playlist = user.playlists.filter(playlist => playlist.name === playlist_name);
            selected_playlist[0].songs.push(song_id);
            user.save();
            User.findOne({_id: MLAB_USER_ID})
                .populate('playlists.songs')
                .then(savedUser => {
                    res.status(200).json(savedUser.playlists);
                });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
}

const addSongToFavorites = (req, res) => {
    let { song_id } = req.body;
    User.findOne({_id: MLAB_USER_ID})
        .then(user => {
            user.favorites.push(song_id);
            user.save();
            res.status(200).json(user.favorites);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
}

const removeSongFromPlayList = (req, res) => {
    let { playlist_name, song_id } = req.body;
    User.findOne({_id: MLAB_USER_ID})
        .then(user => {
            let selected_playlist = user.playlists.filter(playlist => playlist.name === playlist_name);
            selected_playlist[0].songs.pop(song_id);
            user.save();
            User.findOne({_id: MLAB_USER_ID})
                .populate('playlists.songs')
                .then(savedUser => {
                    res.status(200).json(savedUser.playlists);
                });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
}

const removeSongFromFavorites = (req, res) => {
    let { song_id } = req.body;
    User.findOne({_id: MLAB_USER_ID})
        .then(user => {
            user.favorites.pop(song_id);
            user.save();
            res.status(200).json(user.favorites);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({err, msg:"Song doesn't exist in favorites."});
        });
}

module.exports={
    getUser,
    addUser,
    addPlaylist,
    addSongToPlaylist,
    removeSongFromPlayList,
    addSongToFavorites,
    removeSongFromFavorites
}