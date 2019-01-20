const youtubedl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const Song = require('../models/Song');

const getSong = (req, res) => {
  let fileId = req.query.id;
  let file = path.join(__dirname,'..', 'public','music', fileId);

  fs.exists(file, function(exists){
    if(exists){
      let rstream = fs.createReadStream(file);
      rstream.pipe(res);
    }
    else{
      res.status(400).json({err:"error"});
    }
  });
}

const getSongList = (req, res) => {
  Song.find()
    .then(songs => {
      res.status(200).json(songs);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
}

const downloadSong = (req, res) => {
  let {url, name, artist} = req.body;
  let full_name = artist.trim() + " - " + name.trim();
  let file = path.join(__dirname,'..', 'public','music');
  let output = file + '\\' + full_name + '.mp3';
  let videoReadableStream = youtubedl(url, { filter: 'audioonly'});

  videoReadableStream.on('info', function(info){
    console.log('Download started');
    console.log('filename: ' + output);
    let newSong = new Song({
      name: name,
      artist: artist,
      file_name: `${full_name}.mp3`,
      file_url: `/static/${full_name}.mp3`,
      length_seconds: info.length_seconds,
      thumbnail_url: info.thumbnail_url,
      youtube_url: url
    })

    newSong.save((err, song) => {
      if(err){
        res.status(400).json(err);
        console.log(err);
      }else{
        res.status(200).json(song);
        console.log('Download complete');
      }
    });
  });

  //flag means open file for appending and if file does not exist, it is created
  let videoWritableStream = fs.createWriteStream(output, { flags: 'a' });
  videoReadableStream.pipe(videoWritableStream);

  //important info : thumbnail_url, length_seconds
}


module.exports = {
  getSong,
  getSongList,
  downloadSong
}