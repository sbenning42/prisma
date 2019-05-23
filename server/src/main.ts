import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";
import { resolvers } from "./servers/graphql";
import { applyRestEndpoints } from "./servers/rest";

dotenv.config();

const {
  PORT = 4266,
  CORS_CREDENTIALS = true,
  CORS_ORIGIN = 'http://localhost:4200',
} = process.env;

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: request => ({ ...request, prisma })
});

applyRestEndpoints(server.express);

server.start({
    port: PORT,
    cors: {
        credentials: CORS_CREDENTIALS as boolean,
        origin: CORS_ORIGIN
    },
}, () => console.log(`Server is running on http://localhost:${PORT}`));
