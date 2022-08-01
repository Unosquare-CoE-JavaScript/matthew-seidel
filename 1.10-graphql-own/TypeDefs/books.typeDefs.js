const { gql } = require("apollo-server");

module.exports =  gql`
  type Book {
    title: String
    author: String
    published: Int
    publisher: String
    pages: Int
  }
  type Query{
    books: [Book]
    booksByAuthor(author: String!): [Book]
    booksByPublisher(publisher: String!): [Book]
    booksByTitle(title: String!): [Book]
  }
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            publisher: String!
            pages: Int!
        ]: Book
    }
`;
