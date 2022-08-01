const posts = [
  {
    id: "1",
    title: "Hello World",
    body: "This is my first post",
    published: true,
  },
];

module.exports = {
  resolvers: {
    Query: {
      posts: () => posts,
    },
  },
};
// export default resolvers;
