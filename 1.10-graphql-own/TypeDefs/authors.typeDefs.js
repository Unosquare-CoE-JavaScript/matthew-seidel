const { gql } = require("apollo-server");

module.exports = gql`
  type Author {
    name: String!
    books: [String]!
    born: String!
    died: String
  }
  type Query {
    authors: [Author]
    author(name: String!): Author
  }
  type Mutation {
    addAuthor(
      name: String!
      books: [String]!
      born: String!
      died: String
    ): Author
  }
`;
