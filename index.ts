import express from "express";
import { ApolloServer } from "apollo-server-express";
import { readFileSync } from "fs";
import path from "path";

import { typeDefs } from "./src/schema";
import resolvers from "./src/resolvers";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    token: req.headers.authorization || "",
  }),
});

const PORT = process.env.PORT || 4000;

// Serve the GraphQL Playground
app.get("/playground", (req, res) => {
  const playgroundHtml = readFileSync(
    path.join(__dirname, "playground.html"),
    "utf8"
  );
  res.send(playgroundHtml.replace("GRAPHQL_ENDPOINT", server.graphqlPath));
});

// serve the app
server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 GraphQL Playground available at http://localhost:${PORT}/playground`
    );
  });
});
