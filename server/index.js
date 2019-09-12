const express = require ('express')
const app = express()
const port = 3002
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const cors = require('cors')
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

app.use(cors())
app.use(express.static('public'))
//setting up server and parse data
app.use(`/listing/:id`,express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//write a create ID function to call in ID slot to enumerate all listings.
/////////////////////////////////////////////////////////////
//
// This Below Section Is For ElasticSearch
//
//
//create new elasticsearch entry
app.post('/api/rooms/', (req, res) =>{
 client.index({
     "index" : 'rooms',
     "type" : '_doc',
     "id" : 2,
     "body" : {
        "listing" : {
          "cost" : null,
          "rating" : null,
          "ratingAmount" : null,
          "guestsAllowed" : null,
          "guestsInfants" : null,
          "cleaningFee" : null,
          "serviceFee" : null,
          "occupancyFee" : null,
          "daysMinimum" : null,
          "reservations" : null,
          "adultsChosen" : 1,
          "childrenChosen" : 0,
          "infantsChosen" : 0,
          "startDate" : null,
          "endDate" : null,
          "blackDate" : null,
        },
        "reservedDates" : {
          "adultsChosen" : 1,
          "childrenChosen" : 0,
          "infantsChosen" : 0,
          "startDate" : null,
          "endDate" : null,
          "blackDate" : null,
        }
     }
 }, function(err, resp, status) {
     console.log(resp);
 })
})
//
//get listing data by room ID
app.get('/api/listingData/:id', (req, res) => {
  let id = req.params.id;
  client.get({
      "index" : 'rooms',
      "id" : id
  }).then(function(resp) {
      console.log(resp.body);
      res.send(resp.body);
  }, function(err) {
      console.log(err.message);
  });
})
//
//get reservations data according to listing ID
app.get('/api/reservations/:listingId', (req, res) => {
  let listingId = req.params.listingId;
  client.search({
      "index" : 'rooms',
      "id" : id
  }).then(function(resp) {
      console.log(resp.body);
      res.send(resp.body);
  }, function(err) {
      console.trace(err.message);
  });
})
//
//update existing data
app.post('/api/rooms/:id', (req,res) =>{
  let id = req.params.id;

})
//
//
////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////////
//
// ORIGINAL ENDPOINTS
//
//get listing data according to the ID
// app.get('/api/listingData/:id', (req, res) => {
//   let id = req.params.id
//   db.getListing(id, (result)=> {
//     console.log(`sent back listing ${id} information!`)
//     res.send(result[0])
//   })
// })
//
app.get('api/')
//
//get reservations data according to listing ID
// app.get('/api/reservations/:listingid', (req, res) => {
//   let listingid = req.params.listingid
//   db.getReservations(listingid, (result) => {
//     console.log( `sent back all reservations for ${listingid}`)
//     res.send(result)
//   })
// })

//start up the listening on the port
  app.listen(port, ()=> console.log(`Reservations module listening on port ${port}`))