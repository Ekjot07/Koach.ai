import { Room, Client } from "@colyseus/core";
import { Schema, type, MapSchema } from "@colyseus/schema";

class PlayerShape extends Schema {
  @type("float32") x: number;
  @type("float32") z: number;
  @type([ "float32" ]) vertices: number[];
}

class State extends Schema {
  @type({ map: PlayerShape }) players = new MapSchema<PlayerShape>();
}

export class MyRoom extends Room<State> {
  onCreate(options: any) {
    this.setState(new State());

    this.onMessage("move", (client, data) => {
      const shape = this.state.players.get(client.sessionId);;
      if (shape) {
        shape.x = data.x;
        shape.z = data.z;
        this.broadcast("playerMoved", { id: client.sessionId, x: shape.x, z: shape.z });
      }
    });

    this.onMessage("drawShape", (client, data) => {
      const shape = new PlayerShape();
      shape.x = data.x;
      shape.z = data.z;
      shape.vertices = data.vertices; // 2D shape vertices
      this.state.players.set(client.sessionId, shape);
      this.broadcast("shapeCreated", { id: client.sessionId, x: shape.x, z: shape.z, vertices: shape.vertices });
    });
  }

  onJoin(client: Client) {
    console.log("Player joined:", client.sessionId);
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId);
    this.broadcast("playerLeft", { id: client.sessionId });
  }

};
