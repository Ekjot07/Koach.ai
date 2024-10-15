// index.ts
import { Server } from "colyseus";
import { GameRoom } from "./rooms/GameRoom";
import { createServer } from "http";

const port = 2567;
const gameServer = new Server({
  server: createServer(),
});

gameServer.define("game_room", GameRoom);

gameServer.listen(port);
console.log(`Colyseus listening on ws://localhost:${port}`);
