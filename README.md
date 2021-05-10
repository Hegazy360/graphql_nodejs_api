# Stuart Courier API
## Stack
- API: GraphQL
- Server: Express + Apollo
- Language: TypeScript 
- Testing: Jest
- Deployment: Heroku

## This API gives clients access to couriers to
- Get a list of all available couriers
- Update/remove a courier's maximum and/or available capacity
- Lookup couriers by their maximum or available capacity using a client's required capacity

## Running the project
- To test the API easily, I've enabled graphQL playground on production.
The playground can be accessed here https://stuart2.herokuapp.com/api/v1

  ### Query example:
  ```
  query {
    getAllCouriers {
      id
      max_capacity
      available_capacity
    },
    lookUpCouriersByMaxCapacity(capacity_required: 30) {
      id
      max_capacity
      available_capacity
    }
    lookUpCouriersByAvailableCapacity(capacity_required: 12) {
      id
      max_capacity
      available_capacity
    }
  }
  ```

  ### Mutation example
  ```
  mutation {
    updateCourierMaxCapacity(id: 3, max_capacity: 50) {
      id
      max_capacity
      available_capacity
    }
    updateCourierAvailableCapacity(id: 4, available_capacity: 40) {
      id
      max_capacity
      available_capacity
    }
    removeCourierMaxCapacity(id: 1) {
      id
      max_capacity
      available_capacity
    }
  }
  ```


- To run the API locally:
  - Clone this repo
  - Install dependencies using `npm install`
  - Run local server using `npm run-script build:dev`
  - Go to `http://localhost:4000/api/v1` to access the playground
  - To run all tests use `npm test`

## Architecture
The API uses a modular architecture, each file has a single responsibility and each folder contains files related to a specific model, in this case it's the Courier's model.

Avoiding over-architecting the API was also taken into consideration to avoid long term costs and maintain code clarity.

## Testing
All endpoint are tested using Jest snapshot testing and an apollo test client.

Tests can be improved by mocking data for all endpoints, an example on how we'd do so and the architecture I'd follow was left as a comment in the code in `tests/courier.test.ts`

## Schema design
One of the goals was to design a future-proof schema, to do so I've separated schemas by model and made use of `graphql-tools/load` to load all schemas in a synchronized way.

I've also used the same architecture to define resolvers and separate them by model.

Using the same design for both, will allow us to easily define new endpoints later on and integrate them into the server without having large files, which can be hard to maintain and read. (Also making PRs easier to review which is always nice)

## Error Handling
Basic error handling conditions were put in place to respond with clear error messages and error codes to help clients identify potential problems such as if a courier's id is wrong or doesn't exist.

## Race conditions
GraphQL mutations were used to update couriers, unlike queries that run in parallel, mutations run in series, one after the other by design to avoid having race conditions.

That's for mutations, but what if a client requests data (a query), and right after, these data were mutated? In that case we might have to rely on a subscription endpoint (That uses websockets) to allow live updates and ensure the client always has the latest data.

## What I'd do if I had more time
- Develop a client interface to showcase how the API can be used in a software.
- Setup a CI pipeline to ensure tests pass before deploying branches
- Improve API documentations by adding more info about each endpoint
- Spend more time improving the tests expectations, architecture and mocking all the necessary data.
- Add an authentication system to secure the API
- Add rate limiting and query timeouts to avoid API abuse

