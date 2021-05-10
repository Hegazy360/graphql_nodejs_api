import { createTestClient } from 'apollo-server-testing'
import { ApolloServer, gql } from "apollo-server-express";
// import CourierMocks from '../mocks/courier';
import schema from '../schema'

const server = new ApolloServer({
  schema,
  // Leaving this here as a demonstration of how we would add custom mocks
  // when testing and the architecture I'd follow in such case.
  // mocks: {
  //   ...CourierMocks
  // },
});

const GET_ALL_COURIERS = gql`
  query getAllCouriers {
    getAllCouriers {
      id
    }
  }
`;

const LOOKUP_COURIER_BY_MAX_CAPACITY = gql`
  query lookUpCouriersByMaxCapacity($capacity_required: Int!) {
    lookUpCouriersByMaxCapacity(capacity_required: $capacity_required) {
      id,
      max_capacity
    }
  }
`;

const LOOKUP_COURIER_BY_AVAILABLE_CAPACITY = gql`
  query lookUpCouriersByMaxCapacity($capacity_required: Int!) {
    lookUpCouriersByAvailableCapacity(capacity_required: $capacity_required) {
      id,
      available_capacity
    }
  }
`;

const UPDATE_COURIER_MAX_CAPACITY = gql`
  mutation updateCourierMaxCapacity($id: ID!, $max_capacity: Int!) {
    updateCourierMaxCapacity(id: $id, max_capacity: $max_capacity) {
      id,
      max_capacity
    }
  }
`;

const UPDATE_COURIER_AVAILABLE_CAPACITY = gql`
  mutation updateCourierAvailableCapacity($id: ID!, $available_capacity: Int!) {
    updateCourierAvailableCapacity(id: $id, available_capacity: $available_capacity) {
      id,
      available_capacity
    }
  }
`;

const REMOVE_COURIER_MAX_CAPACITY = gql`
  mutation updateCourierMaxCapacity($id: ID!) {
    removeCourierCapacity(id: $id) {
      id,
      max_capacity
    }
  }
`;

const { query, mutate } = createTestClient(server);
test("I can fetch all couriers", async () => {
  const res = await query({ query: GET_ALL_COURIERS });

  expect(res).toMatchSnapshot();
});

test("I can lookup couriers by max capacity", async () => {
  const res = await query({
    query: LOOKUP_COURIER_BY_MAX_CAPACITY,
    variables: { capacity_required: 12 }
  });

  expect(res).toMatchSnapshot();
});

test("I can lookup couriers by available capacity", async () => {
  const res = await query({
    query: LOOKUP_COURIER_BY_AVAILABLE_CAPACITY,
    variables: { capacity_required: 12 }
  });

  expect(res).toMatchSnapshot();
});

test("I can update a courier's max capacity", async () => {
  const res = await mutate({
    mutation: UPDATE_COURIER_MAX_CAPACITY,
    variables: { id: "1", max_capacity: 12 },
  });

  expect(res).toMatchSnapshot();
});

test("I can update a courier's available capacity", async () => {
  const res = await mutate({
    mutation: UPDATE_COURIER_AVAILABLE_CAPACITY,
    variables: { id: "1", available_capacity: 12 },
  });

  expect(res).toMatchSnapshot();
});

test("I can't update a courier's available capacity with an invalid capacity", async () => {
  const res = await mutate({
    mutation: UPDATE_COURIER_AVAILABLE_CAPACITY,
    variables: { id: "1", available_capacity: 300 },
  });

  expect(res).toMatchSnapshot();
});

test("I can't update a courier's max capacity without passing an id", async () => {
  const res = await mutate({
    mutation: UPDATE_COURIER_MAX_CAPACITY,
    variables: { max_capacity: 12 },
  });

  expect(res).toMatchSnapshot();
});

test("I can't update a courier's max capacity without passing a valid id", async () => {
  const res = await mutate({
    mutation: UPDATE_COURIER_MAX_CAPACITY,
    variables: {
      id: "INVALID_ID",
      max_capacity: 12
    },
  });

  expect(res).toMatchSnapshot();
});

test("I can't update a courier's max capacity without passing a new maximum capacity", async () => {
  const res = await mutate({
    mutation: UPDATE_COURIER_MAX_CAPACITY,
    variables: { id: "1" },
  });

  expect(res).toMatchSnapshot();
});

test("I can remove a courier's max capacity", async () => {
  const res = await mutate({
    mutation: REMOVE_COURIER_MAX_CAPACITY,
    variables: { id: "1" },
  });

  expect(res).toMatchSnapshot();
});


