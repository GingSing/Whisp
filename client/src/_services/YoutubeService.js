export const YoutubeService = {
    downloadSong,
}

function downloadSong(url, name, artist){
    let requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url, name, artist})
    };
    return fetch('http://localhost:5000/api/song/downloadSong', requestOptions)
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => { throw new Error(err) });
}