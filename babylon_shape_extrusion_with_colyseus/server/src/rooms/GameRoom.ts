import { Room, Client } from "colyseus";
import { Schema, MapSchema, type } from "@colyseus/schema";

// Shape schema
class Shape extends Schema {
  @type([ "number" ]) vertices: number[] = [];  // Store shape vertices
}

// Player schema
class Player extends Schema {
  @type("string") id: string = "";
  @type("boolean") hasShape: boolean = false;
  @type(Shape) shape: Shape = new Shape();
}

// Game state schema
class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();

  createPlayer(id: string) {
    const player = new Player();
    player.id = id;
    this.players.set(id, player);
    console.log("player created: ", player);
  }

  removePlayer(id: string) {
    this.players.delete(id);
  }

  addShapeToPlayer(id: string, vertices: number[]) {
    const player = this.players.get(id);
    if (player) {
      player.shape.vertices = vertices;
      player.hasShape = true;
      console.log("Added shape to player: ", player);
      
    }
  }
}

// GameRoom class
export class GameRoom extends Room<GameState> {
  onCreate(options: any) {
    console.log("created game room");
    // Initialize the game state
    this.setState(new GameState());
    // Handle the message for extruding shapes
    this.onMessage("extrudeShape", (client, vertices) => {
      this.state.addShapeToPlayer(client.sessionId, vertices);
      this.broadcast("newShape", { playerId: client.sessionId, vertices });
    });
  }

  onJoin(client: Client) {
    // Create a new player when they join
    console.log("new client has joined the room: ", client);
    this.state.createPlayer(client.sessionId);
    this.broadcast("playerJoined", { id: client.sessionId });
  }

  onLeave(client: Client) {
    // Remove the player when they leave
    this.state.removePlayer(client.sessionId);
    this.broadcast("playerLeft", { id: client.sessionId });
  }
}
