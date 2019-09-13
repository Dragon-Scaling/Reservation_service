-- DROP DATABASE reservationsModule;

-- CREATE DATABASE reservationsModule;

CREATE TABLE listing (
  ID int NOT NULL PRIMARY KEY,
  perNight SMALLINT NOT NULL,
  Rating DECIMAL (2,1),
  RatingAmount SMALLINT,
  guestsAllowed SMALLINT NOT NULL,
  guestsInfants SMALLINT,
  cleaningFee SMALLINT,
  serviceFee SMALLINT,
  occupancyFee SMALLINT,
  daysMinimum SMALLINT
);

CREATE TABLE reservations (
  ID INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  numGuests SMALLINT NOT NULL,
  numInfants SMALLINT,
  listingID INT NOT NULL
    REFERENCES listing(ID)
);