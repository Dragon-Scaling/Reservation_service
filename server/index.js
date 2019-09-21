require('newrelic');
const express = require ('express')
const app = express()
const port = 3002
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const cors = require('cors')
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const pool = require('../database/configPostgres.js');


app.use(cors())
app.use(express.static('public'))
//setting up server and parse data
app.use(`/listing/:id`,express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//write a create ID function to call in ID slot to enumerate all listings.


///////////////////////////////////////////////////////////
//
// **           API ENDPOINTS FOR POSTGRES            **
//
///////////////////////////////////////////////////////////
//
// add a listing
app.post('/api/listing/:id', (req, res) => {
  let id = req.params.id
  const { perNight, Rating, RatingAmount, guestsAllowed, guestsInfants, cleaningFee, serviceFee, occupancyFee, daysMinimum } = request.body

  pool.query(`INSERT INTO lissting (ID, perNight, Rating, RatingAmount, guestsAllowed, guestsInfants, cleaningFee, serviceFee, occupancyFee, daysMinimum) VALUES (${id}, ${perNight}, ${rating}, ${ratingAmount}, ${guestsAllowed}, ${guestsInfants}, ${cleaningFee}, ${serviceFee}, ${occupancyFee}, ${daysMinimum})`, (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Listing added with ID: ${results.ID}`)
  })
})
//
// add a reservation to an id
app.post('/api/listing/:id/reservation', (req, res) => {
  let id = req.params.id;
  const { startDate, endDate, numGuests, numInfants, listingID } = req.body
})
//
// get a listings by ID
app.get('/api/listing/:id', (req, res) => {
  let id = req.params.id
  pool.query('SELECT * FROM listing WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})
// get a listings reservations by ID
app.get('/api/reservations/:id', (req, res) => {
  let id = req.params.id
  pool.query('SELECT * FROM reservations WHERE listingid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})
// update existing reservation by ID
app.put('/api/listing/:id/reservation/:reserveId', (req, res) => {
    let id = req.params.id;
    let reservation = req.params.reserveId;
  const { numGuests, numInfants } = req.body

  pool.query(
    'UPDATE reservations SET numGuests = $1, numInfants = $2 WHERE ID = $3',
    [numGuests, numInfants, reservation],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Reservation modified with ID: ${reservation} from listing ${id}`)
    }
  )
})
// delete a reservation
app.delete('/api/listing/:id/reservations/:reserveId', (req, res) => {
  let id = req.params.id;
  let reservation = req.params.reserveId;
  pool.query('DELETE FROM reservations WHERE id = $1', [reservation], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Reservation deleted with ID: ${reservation}`)
  })
})



///////////////////////////////////////////////////////////
//
// ORIGINAL ENDPOINTS
//
// get listing data according to the ID
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

/////////////////////////////////////////////////////////////
//
// This Below Section Is For ElasticSearch
//
////////////////////////////////////////////////////////////
//
//create new elasticsearch entry
// app.post('/api/rooms/', (req, res) =>{
//  client.index({
//      "index" : 'rooms',
//      "type" : '_doc',
//      "id" : 2,
//      "body" : {
//         "listing" : {
//           "cost" : null,
//           "rating" : null,
//           "ratingAmount" : null,
//           "guestsAllowed" : null,
//           "guestsInfants" : null,
//           "cleaningFee" : null,
//           "serviceFee" : null,
//           "occupancyFee" : null,
//           "daysMinimum" : null,
//           "reservations" : null,
//           "adultsChosen" : 1,
//           "childrenChosen" : 0,
//           "infantsChosen" : 0,
//           "startDate" : null,
//           "endDate" : null,
//           "blackDate" : null,
//         },
//         "reservations" : {
//           "adultsChosen" : 1,
//           "childrenChosen" : 0,
//           "infantsChosen" : 0,
//           "startDate" : null,
//           "endDate" : null,
//           "blackDate" : null,
//         }
//      }
//  }, function(err, resp, status) {
//     res.send(status);
//  })
// })
//
//get listing data by room ID
// app.get('/api/listing/:id', (req, res) => {
//   let id = req.params.id;
//   client.get({
//       "index" : 'rooms',
//       "id" : id
//   }).then(function(resp) {
//       res.send(resp.body._source.listing);
//   }, function(err) {
//       console.log(err.message);
//   });
// })
//
//get reservations data according to listing ID
// app.get('/api/reservations/:listingId', (req, res) => {
//   let listingId = req.params.listingId;
//   client.get({
//       "index" : 'rooms',
//       "id" : listingId
//   }).then(function(resp) {
//       console.log(resp.body);
//       res.send(resp.body._source.reservedDates);
//   }, function(err) {
//       console.log(err.message);
//   });
// })
//
//update existing data by room ID
// app.put('/api/rooms/:id', (req,res) =>{
//   let id = req.params.id;
//   client.update({
//     "id" : id,
//     "index" : "rooms",
//     "body" : {
//       "doc" : {
//       "listing" : {
//           "cost" : 4,
//           "rating" : 5,
//           "childrenChosen" : 3
//         }
//       }
//     }
//   }).then(function(resp, status) {
//     console.log(resp);
//     res.send(status);
//   }, function(err) {
//     console.log(err.message);
//   })
// })
//
//delete a record
// app.delete('/api/rooms/:id', (req, res) => {
//   let id = req.params.id;
//   client.delete({
//     "id": id,
//     "index" : 'rooms',
//   }).then(function(err, resp, status) {
//     res.send(status);
//   }, function(err, resp,) {
//     console.log(err.message);
//   });
// })
//
//
////////////////////////////////////////////////////////////


//start up the listening on the port
  app.listen(port, ()=> console.log(`Reservations module listening on port ${port}`))