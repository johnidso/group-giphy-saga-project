const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios')
const router = express.Router();

require('dotenv').config();

router.get('/', (req, res) => {
    console.log('req.query.q:', req.query.q); // test
    const searchString = req.query.q;
    // const searchString = req.body.searchText;
    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchString}&limit=3&rating=pg`)
    .then((result) => {
      // console.log('This is the result:', result); // test
      res.send(result.data);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;