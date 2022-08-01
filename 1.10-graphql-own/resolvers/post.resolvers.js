const { UserInputError } = require("apollo-server");
const axios = require("axios");

module.exports = {
  resolvers: {
    Query: {
      posts: async () => {
        const { data } = await axios.get("http://localhost:3001/post");
        return data;
        // return data.map(async (post) => {
        //   console.log(post);
        //   const result = await axios.get(
        //     `http://localhost:3001/authors?id=${post.authorId}`
        //   );
        //   return {
        //     ...post,
        //     author: result.data[0],
        //   };
        // });
      },
    },
    Mutation: {
      newPost: async (_, { title, author }) => {
        const { data: postAuthor } = await axios.get(
          `http://localhost:3001/author?id=${author}`
        );
        if (!postAuthor) throw new UserInputError("Author not found");
        const { data } = await axios.post("http://localhost:3001/post", {
          title,
          content,
        });
        return data;
      },
    },
    Post: {
      author: async (prev) => {
        const { data } = await axios.get(
          `http://localhost:3001/authors?id=${prev.authorId}`
        );
        return data[0];
      },
    },
  },
};

// export default resolvers;
