const { ApolloServer } = require("apollo-server");
const schema  = require("./TypeDefs/index");

const server = new ApolloServer({
  schema,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
