const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    favorites:[{
        type: mongoose.Schema.ObjectId, ref:"Song", unique: true
    }],
    playlists:[{
        name: { type: String, unique: true, required: true },
        songs: [{
            type: mongoose.Schema.ObjectId, ref:"Song", unique: true
        }]
    }]
});

module.exports = mongoose.model("User", userSchema);