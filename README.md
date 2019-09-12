# Project Name

> Project description

## Related Projects

  - https://github.com/haab-solutions/reservation-module
  - https://github.com/haab-solutions/photo-gallery-module
  - https://github.com/haab-solutions/reviews-module
  - https://github.com/haab-solutions/recommendations-module

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## EndPoints

## create a new room record
> app.post('/api/rooms/')

## get listing data by room ID
> app.get('/api/listingData/:id')

## get reservations data according to listing ID
> app.get('/api/reservations/:listingId')

## update existing data by room ID
> app.put('/api/rooms/:id')

## delete a record
> app.delete('/api/rooms/:id')

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

