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
    res.send(status);
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
      res.send(resp.body._source.listing);
  }, function(err) {
      console.log(err.message);
  });
})
//
//get reservations data according to listing ID
app.get('/api/reservations/:listingId', (req, res) => {
  let listingId = req.params.listingId;
  client.get({
      "index" : 'rooms',
      "id" : listingId
  }).then(function(resp) {
      console.log(resp.body);
      res.send(resp.body._source.reservedDates);
  }, function(err) {
      console.log(err.message);
  });
})
//
//update existing data by room ID
app.put('/api/rooms/:id', (req,res) =>{
  let id = req.params.id;
  client.update({
    "id" : id,
    "index" : "rooms",
    "body" : {
      "doc" : {
      "listing" : {
          "cost" : 4,
          "rating" : 5,
          "childrenChosen" : 3
        }
      }
    }
  }).then(function(resp, status) {
    console.log(resp);
    res.send(status);
  }, function(err) {
    console.log(err.message);
  })
})
//
//delete a record
app.delete('/api/rooms/:id', (req, res) => {
  let id = req.params.id;
  client.delete({
    "id": id,
    "index" : 'rooms',
  }).then(function(err, resp, status) {
    res.send(status);
  }, function(err, resp,) {
    console.log(err.message);
  });
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


//*** Sample Seed Data ***//
//
//   [ { id: 1,
//     perNight: 118,
//     rating: 2.0037984815884853,
//     ratingAmount: 2759,
//     guestsAllowed: 4,
//     guestsInfants: 5,
//     cleaningFee: 12,
//     serviceFee: 18,
//     occupancyFee: 6,
//     daysMinimum: 1 },
//   { id: 2,
//     perNight: 56,
//     rating: 4.3942294213329065,
//     ratingAmount: 2161,
//     guestsAllowed: 2,
//     guestsInfants: 3,
//     cleaningFee: 18,
//     serviceFee: 13,
//     occupancyFee: 5,
//     daysMinimum: 1 },
//   { id: 3,
//     perNight: 181,
//     rating: 3.7945017573997566,
//     ratingAmount: 845,
//     guestsAllowed: 2,
//     guestsInfants: 3,
//     cleaningFee: 13,
//     serviceFee: 26,
//     occupancyFee: 10,
//     daysMinimum: 1 },
//   { id: 4,
//     perNight: 184,
//     rating: 3.31605205905759,
//     ratingAmount: 835,
//     guestsAllowed: 1,
//     guestsInfants: 4,
//     cleaningFee: 18,
//     serviceFee: 10,
//     occupancyFee: 13,
//     daysMinimum: 2 },
//   { id: 5,
//     perNight: 64,
//     rating: 2.5745978806166416,
//     ratingAmount: 2488,
//     guestsAllowed: 2,
//     guestsInfants: 4,
//     cleaningFee: 20,
//     serviceFee: 14,
//     occupancyFee: 5,
//     daysMinimum: 2 },
//   { id: 6,
//     perNight: 109,
//     rating: 1.1807269802388287,
//     ratingAmount: 2244,
//     guestsAllowed: 3,
//     guestsInfants: 5,
//     cleaningFee: 18,
//     serviceFee: 26,
//     occupancyFee: 11,
//     daysMinimum: 2 },
//   { id: 7,
//     perNight: 91,
//     rating: 4.908201303875644,
//     ratingAmount: 14,
//     guestsAllowed: 1,
//     guestsInfants: 3,
//     cleaningFee: 18,
//     serviceFee: 12,
//     occupancyFee: 7,
//     daysMinimum: 2 },
//   { id: 8,
//     perNight: 123,
//     rating: 2.605668479150957,
//     ratingAmount: 2881,
//     guestsAllowed: 3,
//     guestsInfants: 3,
//     cleaningFee: 24,
//     serviceFee: 28,
//     occupancyFee: 11,
//     daysMinimum: 1 },
//   { id: 9,
//     perNight: 105,
//     rating: 4.5383749886227545,
//     ratingAmount: 2364,
//     guestsAllowed: 2,
//     guestsInfants: 5,
//     cleaningFee: 22,
//     serviceFee: 27,
//     occupancyFee: 10,
//     daysMinimum: 2 },
//   { id: 10,
//     perNight: 174,
//     rating: 4.918279431238453,
//     ratingAmount: 62,
//     guestsAllowed: 2,
//     guestsInfants: 4,
//     cleaningFee: 23,
//     serviceFee: 24,
//     occupancyFee: 10,
//     daysMinimum: 2 } ]
// [ { ID: 1,
//     startDate: { year: 2019, month: '09', day: '27' },
//     endDate: { year: 2019, month: '09', day: '29' },
//     numGuests: 3,
//     numInfants: 1,
//     listingID: 1 },
//   { ID: 2,
//     startDate: { year: 2019, month: '10', day: '11' },
//     endDate: { year: 2019, month: '10', day: '13' },
//     numGuests: 2,
//     numInfants: 1,
//     listingID: 1 },
//   { ID: 3,
//     startDate: { year: 2019, month: '08', day: '12' },
//     endDate: { year: 2019, month: '08', day: '15' },
//     numGuests: 3,
//     numInfants: 2,
//     listingID: 1 },
//   { ID: 4,
//     startDate: { year: 2019, month: '10', day: '05' },
//     endDate: { year: 2019, month: '10', day: '08' },
//     numGuests: 2,
//     numInfants: 2,
//     listingID: 1 },
//   { ID: 5,
//     startDate: { year: 2019, month: '08', day: '06' },
//     endDate: { year: 2019, month: '08', day: '08' },
//     numGuests: 2,
//     numInfants: 2,
//     listingID: 1 },
//   { ID: 6,
//     startDate: { year: 2019, month: '08', day: '10' },
//     endDate: { year: 2019, month: '08', day: '12' },
//     numGuests: 3,
//     numInfants: 0,
//     listingID: 1 },
//   { ID: 7,
//     startDate: { year: 2019, month: '08', day: '21' },
//     endDate: { year: 2019, month: '08', day: '24' },
//     numGuests: 3,
//     numInfants: 2,
//     listingID: 1 },
//   { ID: 8,
//     startDate: { year: 2019, month: '09', day: '12' },
//     endDate: { year: 2019, month: '09', day: '13' },
//     numGuests: 3,
//     numInfants: 0,
//     listingID: 1 },
//   { ID: 9,
//     startDate: { year: 2019, month: '08', day: '10' },
//     endDate: { year: 2019, month: '08', day: '11' },
//     numGuests: 2,
//     numInfants: 1,
//     listingID: 1 },
//   { ID: 10,
//     startDate: { year: 2019, month: '09', day: '21' },
//     endDate: { year: 2019, month: '09', day: '22' },
//     numGuests: 3,
//     numInfants: 2,
//     listingID: 1 } ]