export const YoutubeService = {
    downloadSong,
    getMetaData,
}

function downloadSong(url, name, artist){
    let requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url, name, artist})
    };
    return fetch('/api/song/downloadSong', requestOptions)
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => { throw new Error(err) });
}

function getMetaData(url){

    let parsedUrl = youtube_parser(url);
    let combinedUrl = `https://noembed.com/embed?url=http://www.youtube.com/watch?v=${parsedUrl}`

    return fetch(combinedUrl)
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => { throw new Error(err) });

    //function below copied from stackoverflow (it gets the video id from the youtube link)
    function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
}