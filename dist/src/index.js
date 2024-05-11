import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/index.js";
import resolvers from "./resolvers/index.js";
const PORT = process.env.PORT || 4000;
// create the app
const app = express();
// create the server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        token: req.headers.authorization || "",
    }),
});
// serve the app
server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
