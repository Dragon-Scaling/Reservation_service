const faker = require('faker');

//get random with minimum and maximum
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//get random integer with minimum and maximum
var getRandomInt = (min, max) => {
  return (Math.random() * (max-min) + min);
}
//generates an array of objects with keys
module.exports.generateListing = function () {
  let listings = [];
  for (let id = 1; id <= 100; id++) {
    let perNight = faker.random.number(150) + 50;
    let rating = getRandomInt(1 , 5)
    let ratingAmount = faker.random.number(3000);
    let guestsAllowed = faker.random.number(4) + 1
    let guestsInfants = faker.random.number(3) + 3
    let cleaningFee = faker.random.number(15) + 10;
    let serviceFee = faker.random.number(20)+ 10;
    let occupancyFee = faker.random.number(10) + 5;
    let daysMinimum = getRandomNum(1,4)
    listings.push({
      "id": id,
      "perNight": perNight,
      "rating": rating,
      "ratingAmount" : ratingAmount,
      "guestsAllowed": guestsAllowed,
      "guestsInfants": guestsInfants,
      "cleaningFee" : cleaningFee,
      "serviceFee" : serviceFee,
      "occupancyFee" : occupancyFee,
      "daysMinimum": daysMinimum
    })
  }
  return listings;
}
//generates an array of reservations with keys
module.exports.generateReservations = function (number) {
  let reservations = [];

  for (let id = 1; id <= 10; id ++) {
//HAS TO BE IN SQL FORMAT YYYY-MM-DD
    let startD = new Date();
    startD.setMonth(startD.getMonth() + getRandomNum(-1, 2))
    startD.setDate(getRandomNum(1,29) + 1)
    //object start date with year month and day
    let startDate = {};
    startDate.year = 2019;
    startDate.month = ('0' + (startD.getMonth() + 1)).slice(-2)
    startDate.day = ('0' + (startD.getDate())).slice(-2)
    let stayTime = getRandomNum(1, 4);
    let endD = new Date(startD.valueOf())
    endD.setDate(endD.getDate() + stayTime)
    //object endDate with year month and day
    let endDate = {};
    endDate.year = 2019;
    endDate.month = ('0' + (endD.getMonth() + 1)).slice(-2);
    endDate.day = ('0' + (endD.getDate())).slice(-2)

//rest of necessary keys
    let numGuests = faker.random.number(2)+2;
    let numInfants = faker.random.number(3);

    reservations.push({
      "ID": id,
      "startDate": startDate,
      "endDate": endDate,
      "numGuests": numGuests,
      "numInfants": numInfants,
      "listingID": number
    })
  }
  return reservations;
}
