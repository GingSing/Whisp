export const UserService = {
    getUserInfo,
    addPlaylist,
}

function getUserInfo(){
    return fetch('http://localhost:5000/user/getUser')
        .then(res=>res.json())
        .then(data=>{ return data })
        .catch(err=>{ throw new Error(err) });
}

function addPlaylist(playlistName){
    let requestOptions={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({playlist_name: playlistName})
    };
    return fetch('http://localhost:5000/user/addPlaylist', requestOptions)
        .then(res=>res.json())
        .then(data=>{ return data })
        .catch(err=>{ throw new Error(err) });
}