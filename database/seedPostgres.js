const pool = require('./configPostgres.js');
const seed = require ('./SeedRandom.js')
//connects to necessary things
// ;(async () => {
//   // note: we don't try/catch this because if connecting throws an exception
//   // we don't need to dispose of the client (it will be undefined)
//   const client = await pool.connect()

//   try {
//     //function for generating input listing
//     await client.query('BEGIN')
//     const listing = await seed.generateListing()
//     for (let i = 0; i < listing.length; i++) {
//       const queryText = `INSERT INTO listing (ID, perNight, Rating, RatingAmount, guestsAllowed, guestsInfants, cleaningFee, serviceFee, occupancyFee, daysMinimum) VALUES (${listing[i].id}, ${listing[i].perNight}, ${listing[i].rating}, ${listing[i].ratingAmount}, ${listing[i].guestsAllowed}, ${listing[i].guestsInfants}, ${listing[i].cleaningFee}, ${listing[i].serviceFee}, ${listing[i].occupancyFee}, ${listing[i].daysMinimum})`;
//       await client.query(queryText);
//     }
//       await client.query('COMMIT')
//   } catch (e) {
//     await client.query('ROLLBACK')
//     throw e
//   } finally {
//     client.release()
//   }
// }


;(async () => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    for (let i = 1; i < 10000000; i++) {
      const reserve = await seed.generateReservations(i)
      for (let j = 0; j < reserve.length; j++) {
        const secondQuery = `INSERT INTO reservations (startDate, endDate, numGuests, numInfants, listingID) VALUES ('${reserve[j].startDate.year}-${reserve[j].startDate.month}-${reserve[j].startDate.day}', '${reserve[j].endDate.year}-${reserve[j].endDate.month}-${reserve[j].endDate.day}', ${reserve[j].numGuests}, ${reserve[j].numInfants}, ${reserve[j].listingID})`;
        await client.query(secondQuery);
      }
    }
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
})().catch(e => console.error(e.stack))

////for repopulating reservations
// inputListing()

////for repopulating the listing
// reservationsListing()
