import gql from "graphql-tag";

export const FOOD_ITEMS = gql`
  query {
        foodItems {
        name
    }
  }
`;