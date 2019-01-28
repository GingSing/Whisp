const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const db = process.env.MONGO_URI || require('./config').MONGO_URI;
const PORT = 5000;

const song = require('./routes/api/song');
const user = require('./routes/user/user');


mongoose.connect(db, { useNewUrlParser: true })
    .then(()=> console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());

app.use('/static', express.static(path.join(__dirname, 'public', 'music')));

app.use('/api/song', song);
app.use('/user', user);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));