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

## create a new reservation for listing
> post('/api/listing/:id')

## get a listings by ID
> get('/api/listing/:id')

## get a listings reservations by ID
> get('/api/listing/:id/reservations')

## update existing reservation by ID
> put('/api/listing/:id/reservation/:reserveId')

## delete a reservation
> delete('/api/listing/:id/reservations/:reserveId')

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

