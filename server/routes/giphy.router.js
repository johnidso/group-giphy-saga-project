const express = require('express');
const pool = require('../modules/pool');
import axios from 'axios';

const router = express.Router();

router.post('/', (req, res) => {
    console.log('in giphy router');
    axios.post('http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=banana&limit=3&rating=pg')
    .then((result) => {
      res.send(result.data);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;