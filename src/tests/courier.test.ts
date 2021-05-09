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

const LOOKUP_COURIER_BY_CAPACITY = gql`
  query lookUpCouriersByMaxCapacity($capacity_required: Int!) {
    lookUpCouriersByMaxCapacity(capacity_required: $capacity_required) {
      id,
      max_capacity
    }
  }
`;

const UPDATE_COURIER_CAPACITY = gql`
  mutation updateCourierCapacity($id: ID!, $max_capacity: Int!) {
    updateCourierCapacity(id: $id, max_capacity: $max_capacity) {
      id,
      max_capacity
    }
  }
`;

const REMOVE_COURIER_CAPACITY = gql`
  mutation updateCourierCapacity($id: ID!) {
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

test("I can lookup couriers by capacity", async () => {
  const res = await query({
    query: LOOKUP_COURIER_BY_CAPACITY,
    variables: { capacity_required: 12 }
  });

  expect(res).toMatchSnapshot();
});

test("I can update a courier's max capacity", async () => {
  const res = await mutate({
    mutation: UPDATE_COURIER_CAPACITY,
    variables: { id: "1", max_capacity: 12 },
  });

  expect(res).toMatchSnapshot();
});

test("I can't update a courier's max capacity without passing an id", async () => {
  const res = await mutate({
    mutation: UPDATE_COURIER_CAPACITY,
    variables: { max_capacity: 12 },
  });

  expect(res).toMatchSnapshot();
});

test("I can't update a courier's max capacity without passing a valid id", async () => {
  const res = await mutate({
    mutation: UPDATE_COURIER_CAPACITY,
    variables: {
      id: "INVALID_ID",
      max_capacity: 12
    },
  });

  const { errors } = await res;

  expect((errors[0].extensions).code).toEqual("COURIER_NOT_FOUND")
  expect(res).toMatchSnapshot();
});

test("I can't update a courier's max capacity without passing a new maximum capacity", async () => {
  const res = await mutate({
    mutation: UPDATE_COURIER_CAPACITY,
    variables: { id: "1" },
  });

  expect(res).toMatchSnapshot();
});

test("I can remove a courier's max capacity", async () => {
  const res = await mutate({
    mutation: REMOVE_COURIER_CAPACITY,
    variables: { id: "1" },
  });

  expect(res).toMatchSnapshot();
});


