import { FastifyInstance, FastifyServerOptions } from "fastify";

export type DrawStatus = "draw" | "erase";

export interface IDraw {
  x: number;
  y: number;
  color: string;
  size: number;
  status: DrawStatus;
}

export default function WebSocketRoutes(
  server: FastifyInstance,
  _: FastifyServerOptions,
  done: () => void
) {
  server.ready(() => {
    server.io.on("connect", (socket) => {
      socket.on("drawing", (data: IDraw) => {
        socket.broadcast.emit("drawing", data);
      });

      socket.on("finish-drawing", () => {
        socket.broadcast.emit("finish-drawing");
      });
    });
  });

  done();
}
