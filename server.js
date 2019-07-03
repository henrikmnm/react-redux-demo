const express = require('express');
const axios = require('axios');

const cors = require('cors');
const app = express();
const port = 3030;

const properties = require('./properties');

app.use(cors());

app.get('/search/:searchString', (req, res) => {
    axios.get(properties.searchMovieTitlesBaseUrl, {
        params: {
            apiKey: properties.openMovieDBApiKey,
            s: req.params.searchString
        }
    })
    .then(response => {
        console.log("Data received: ", response.data);
        res.set('Access-Control-Allow-Origin', '*');
        res.send({data: response.data});
    })
    .catch(err => console.warn("ERROR: ", err));
});

app.listen(port, () => console.log("Backend server is up and running on port: ", port));