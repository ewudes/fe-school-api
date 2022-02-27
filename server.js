const express = require('express');

const app = express();

const artists = [
    {
        id: 1,
        name: 'Metallica'
    },
    {
        id: 2,
        name: 'Iron Maiden'
    },
    {
        id: 3,
        name: 'Deep Purple'
    }
];

app.get('/', function(req, res) {
    res.send('Hello API');
});

app.get('/artists', function(req, res) {
    res.send(artists);
});

app.get('/artists/:id', function(req, res) {
    const artist = artists.find(function(artist) {
        return artist.id === Number(req.params.id);
    });

    res.send(artist);
})

app.listen(3012, function() {
    console.log('API app starting');
});