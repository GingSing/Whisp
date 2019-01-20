const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const songSchema = new Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    file_name: { type: String, required: true, unique: true},
    file_url: {type: String, required: true, unique: true},
    length_seconds: { type: Number, required: true },
    date_downloaded: { type: Date, default: Date.now },
    thumbnail_url: {type: String },
    youtube_url: {type: String, require: true, unique: true}
});

module.exports = mongoose.model("Song", songSchema);