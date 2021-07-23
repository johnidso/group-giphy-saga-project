const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM favorites';
  pool.query(queryText)
  .then(result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('Error getting favorites', err);
    res.sendStatus(500);
  });
});

// add a new favorite
router.post('/', (req, res) => {
  console.log('req.body.url is:', req.body.url); // test
  const gifUrl = req.body.url;
  let queryText = `INSERT INTO "favorites" ("url") VALUES ($1);`;

  pool.query(queryText, [gifUrl])
    .then(response => {
      console.log('successfully added GIF to DB'); // test
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Error adding favorite to DB. Error:', error);
      res.sendStatus(500);
    })
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  console.log('inside router.put', req.body);
  const idToUpdate = req.body
  const queryText =  `UPDATE favorites, SET category_id" = $1;`;
  pool.query(queryText, [idToUpdate])
  .then(dbResponse => {
    console.log('successfully updated category');
    res.sendStatus(201);
  })
  .catch(error => {
    res.sendStatus(500);
  })

});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
