const mongoose = require('mongoose');
const url = 'mongodb+srv://Mariano:menime33@core.r48ze.mongodb.net/notesdb?retryWrites=true&w=majority';

mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));