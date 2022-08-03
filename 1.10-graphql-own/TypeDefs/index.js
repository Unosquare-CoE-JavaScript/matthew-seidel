const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeResolvers } = require("@graphql-tools/merge");
const {  makeExecutableSchema } = require("@graphql-tools/schema");
const path = require("path");
const dirname = path.join(process.cwd());
const schemas = loadFilesSync(dirname, {
    extensions: [".graphql"],
    recursive: true,
    include: ["**/*.graphql"],
    exclude: ["**/node_modules/**", "**/generated/**"],
})

const resolversFiles = loadFilesSync(path.join(dirname, "**/*.resolvers.js"));

module.exports = makeExecutableSchema({
    typeDefs: schemas,
    resolvers: mergeResolvers(resolversFiles),
});;
