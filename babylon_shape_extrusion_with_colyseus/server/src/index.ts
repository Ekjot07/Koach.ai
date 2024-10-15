import { Server } from "colyseus";
import { MyRoom } from "./rooms/MyRoom";
import { createServer } from "http";

const port = 2567;
const gameServer = new Server({
  server: createServer(),
});

gameServer.define("my_room", MyRoom);

gameServer.listen(port);
console.log(`Colyseus listening on ws://localhost:${port}`);
