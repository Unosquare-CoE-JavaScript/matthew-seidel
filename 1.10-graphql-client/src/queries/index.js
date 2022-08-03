import {gql} from "@apollo/client"

export const GET_POSTS = gql`
query Query {
    posts {
      title
      author {
        firstName
        lastName
      }
      votes
    }
  }
`;
