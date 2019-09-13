const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const seed = require ('./SeedRandom.js')
//connects to necessary things
const connection = mysql.createConnection(mysqlConfig);

//function for generating input listing
var inputListing = function () {
  var listing = seed.generateListing()
  for (let i = 0; i < listing.length; i++) {
    connection.query(`INSERT INTO listing (ID, perNight, Rating, RatingAmount, guestsAllowed, guestsInfants, cleaningFee, serviceFee, occupancyFee, daysMinimum) VALUES (${listing[i].id}, ${listing[i].perNight}, ${listing[i].rating}, ${listing[i].ratingAmount}, ${listing[i].guestsAllowed}, ${listing[i].guestsInfants}, ${listing[i].cleaningFee}, ${listing[i].serviceFee}, ${listing[i].occupancyFee}, ${listing[i].daysMinimum})`,(err, results) => {
      if (err) {
        console.log (err)
      } else {
        console.log( results, "this is results ")
      }
    })
  }
}
//function for generating reservations listing
var reservationsListing = function () {
  for (let i = 1; i <= 100; i++) {
    var reserve = seed.generateReservations(i)
    for (let j = 0; j < reserve.length; j++) {

      connection.query(`INSERT INTO reservedDates (ID, startDate, endDate, numGuests, numInfants, listingID) VALUES (NULL, "${reserve[j].startDate.year}-${reserve[j].startDate.month}-${reserve[j].startDate.day}","${reserve[j].endDate.year}-${reserve[j].endDate.month}-${reserve[j].endDate.day}", ${reserve[j].numGuests}, ${reserve[j].numInfants}, ${reserve[j].listingID})`, (err, results) =>{
        if (err) {
          console.log( err, "this is the err")
        } else {
          console.log(results, "this is results")
        }
      })
    }
  }
}


////for repopulating reservations
inputListing()

////for repopulating the listing
reservationsListing()

connection.end();