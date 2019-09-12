-- DROP DATABASE IF EXISTS reservationsModule;

CREATE SCHEMA reservationsModule;

-- CREATE DATABASE reservationsModule;

-- USE reservationsModule;

CREATE TABLE reservationsModule.listing (
  ID int NOT NULL PRIMARY KEY,
  perNight int NOT NULL,
  perNightX int,
  Rating DECIMAL (2,1),
  RatingAmount int,
  guestsAllowed int NOT NULL,
  guestsInfants int,
  cleaningFee int,
  serviceFee int,
  occupancyFee int,
  daysMinimum int
);

CREATE TABLE reservedDates (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  numGuests INT NOT NULL,
  numInfants INT,
  listingID INT NOT NULL,
  FOREIGN KEY (listingID)
    REFERENCES listing(ID)
);