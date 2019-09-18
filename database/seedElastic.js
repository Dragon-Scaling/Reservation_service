const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const seed = require ('./SeedRandom.js')
var csvWriter = require('csv-write-stream')
const fs = require('fs');
//connects to necessary things

// var writer = csvWriter({
//   headers: [
//     'index',
//     'type',
//     'id',
//     'cost',
//     'rating',
//     'ratingAmount',
//    'guestsAllowed',
//     'guestsInfants',
//     'cleaingFee',
//     'serviceFee',
//     'occupancyFee',
//     'daysMinimum',
//     'adultsChosen',
//     'childrenChosen',
//     'startDate',
//     'endDate',
//     'blackDate',
//     'reservations',
//   ],
// });

// writer.pipe(fs.createWriteStream('out.csv'))

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



// const num = 2;
// // function for generating input listing
// let j = 0;
// (async () => {
//   for (j = 1; j <= num; j += 1) {
//   var listing = seed.generateListing()
//     for (let i = 0; i < listing.length; i++) {
//       var writing = writer.write({
//         "index" : 'listing',
//         "type" : '_doc',
//         "id" : listing[i].id,
//         "cost" : listing[i].perNight,
//         "rating" : listing[i].rating,
//         "ratingAmount" : listing[i].ratingAmount,
//         "guestsAllowed" : listing[i].guestsAllowed,
//         "guestsInfants" : listing[i].guestsInfants,
//         "cleaningFee" : listing[i].cleaningFee,
//         "serviceFee" : listing[i].serviceFee,
//         "occupancyFee" : listing[i].occupancyFee,
//         "daysMinimum" : listing[i].daysMinimum,
//         "reservations" : null,
//         "adultsChosen" : 1,
//         "childrenChosen" : 0,
//         "infantsChosen" : 0,
//         "startDate" : null,
//         "endDate" : null,
//         "blackDate" : null,
//         "reservations" : JSON.stringify(reservationsListing(i))
//       });
//       if (!writing) {
//         await new Promise((resolve) => {
//           writer.once('drain', resolve);
//         })
//       }
//     }
//   }
//   await new Promise((resolve) => {
//     writer.end('', () => {
//       resolve();
//     });
//   });
//   // writer.end()
//   // listingCsvWriter
//   // .writeRecords(listingArr)
//   // .then(() => console.log('CSV written successfully'))
// })();


var inputListing = function () {
  var listing = seed.generateListing()
  for (let i = 0; i < listing.length; i++) {
    client.index({
     "index" : 'listing',
     "type" : '_doc',
     "id" : listing[i].id,
     "refresh" : false,
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
    }, function (err, status) {
      // console.log(status, 'Did it did it?');
      if (err) console.log(err)
    });
  }
}



//   headers: [
//     { id: 'index', title: 'index' },
//     { id: 'type', title: 'type' },
//     { id: 'id', title: 'id' },
//     { id: 'cost', title: 'cost' },
//     { id: 'rating', title: 'rating' },
//     { id: 'ratingAmount', title: 'ratingAmount' },
//     { id: 'guestsAllowed', title: 'guestsAllowed' },
//     { id: 'guestsInfants', title: 'guestsInfants' },
//     { id: 'cleaingFee', title: 'cleaingFee' },
//     { id: 'serviceFee', title: 'serviceFee' },
//     { id: 'occupancyFee', title: 'occupancyFee' },
//     { id: 'daysMinimum', title: 'daysMinimum' },
//     { id: 'adultsChosen', title: 'adultsChosen' },
//     { id: 'childrenChosen', title: 'childrenChosen' },
//     { id: 'startDate', title: 'startDate' },
//     { id: 'endDate', title: 'endDate' },
//     { id: 'blackDate', title: 'blackDate' },
//     { id: 'reservations', title: 'reservations' },
//   ],
// });


////for repopulating reservations
inputListing()

////for repopulating the listing
// reservationsListing()