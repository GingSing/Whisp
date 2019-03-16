export const UserService = {
    getUserInfo,
    addPlaylist,
    addSongToFavorites,
    addSongToPlaylist,
    removeSongFromFavorites,
    removeSongFromPlaylist
}

function getUserInfo(){
    return fetch('/user/getUser')
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => { throw new Error(err) });
}

function addPlaylist(playlistName){
    let requestOptions={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({playlist_name: playlistName})
    };
    return fetch('/user/addPlaylist', requestOptions)
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => { throw new Error(err) });
}

function addSongToPlaylist(songId, playlistName){
    let requestOptions={
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({song_id: songId, playlist_name: playlistName})
    };
    return fetch('/user/addSongToPlaylist', requestOptions)
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => { throw new Error(err) });
}

function addSongToFavorites(songId){
    let requestOptions={
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ song_id: songId })
    };
    return fetch('/user/addSongToFavorites', requestOptions)
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => { throw new Error(err) });
}

function removeSongFromPlaylist(songId, playlistName){
    let requestOptions={
        method:'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ song_id: songId, playlist_name: playlistName })
    };
    return fetch('/user/removeSongFromPlaylist', requestOptions)
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => { throw new Error(err) });
}

function removeSongFromFavorites(songId){
    let requestOptions={
        method:'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ song_id: songId })
    };
    return fetch('/user/removeSongFromFavorites', requestOptions)
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => { throw new Error(err) });
}