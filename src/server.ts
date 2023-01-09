import fastify, { FastifyInstance } from "fastify";
import socketioServer from "fastify-socket.io";

import WebSocketRoutes from "./routes/ws.route";

const server: FastifyInstance = fastify();

// Register Socket IO
server.register(socketioServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

server.get("/", async () => {
  return "Hello World!";
});

// Web socket route handler
server.register(WebSocketRoutes);

server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
