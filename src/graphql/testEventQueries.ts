import { gql } from "@apollo/client";

export const GET_TEST_EVENT = gql`
  query GetTestEvent {
    getTestEvent {
      id
      name
      description
      dateRange {
        start
        end
      }
    }
  }
`;
