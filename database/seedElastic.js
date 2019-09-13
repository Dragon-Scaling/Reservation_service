const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const seed = require ('./SeedRandom.js')
//connects to necessary things

//function for generating input listing
var inputListing = function () {
  var listing = seed.generateListing()
  for (let i = 0; i < listing.length; i++) {
    client.index({
     "index" : 'listing',
     "type" : '_doc',
     "id" : listing[i].id,
     "body" : {
        "listing" : {
          "cost" : listing[i].perNight,
          "rating" : listing[i].rating,
          "ratingAmount" : listing[i].ratingAmount,
          "guestsAllowed" : listing[i].guestsAllowed,
          "guestsInfants" : listing[i].guestsInfants,
          "cleaningFee" : listing[i].cleaningFee,
          "serviceFee" : listing[i].serviceFee,
          "occupancyFee" : listing[i].occupancyFee,
          "daysMinimum" : listing[i].daysMinimum,
          "reservations" : null,
          "adultsChosen" : 1,
          "childrenChosen" : 0,
          "infantsChosen" : 0,
          "startDate" : null,
          "endDate" : null,
          "blackDate" : null,
        },
        "reservations" : reservationsListing(i)
      }
    }, function (err, resp, status) {
      console.log(status, 'Did it did it?'));
    });
  }
}

//function for generating reservations listing
var reservationsListing = function (num) {
  var reserve = seed.generateReservations(num);
  var reserveContainer = [];
  for (let j = 0; j < reserve.length; j++) {
    reserveContainer.push({
      "ID" : j,
      "startDate" : { "year" : reserve[j].startDate.year,
                    "month" : reserve[j].startDate.month,
                    "day" : reserve[j].startDate.day },
      "endDate" : { "year" : reserve[j].endDate.year,
                    "month" : reserve[j].endDate.month,
                    "day" : reserve[j].endDate.day },
      "numGuests" : reserve[j].numGuests,
      "numInfants" : reserve[j].numInfants,
      "listingID" : reserve[j].listingID
    })
  }
  return reserveContainer;
}


////for repopulating reservations
inputListing()

////for repopulating the listing
// reservationsListing()