import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as BABYLON from 'babylonjs';
import { Client } from 'colyseus.js';
import { GameRoom } from "./game-room";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('drawingCanvas', { static: true }) drawingCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('babylonCanvas', { static: true }) babylonCanvasRef!: ElementRef<HTMLCanvasElement>;

  private engine!: BABYLON.Engine;
  private scene!: BABYLON.Scene;
  private shapeVertices: { x: number, y: number }[] = []; // Store drawn shape vertices
  private client: Client; // Colyseus client
  private room: GameRoom | null = null;

  constructor() {
    this.client = new Client("ws://localhost:2567"); // Connect to the Colyseus server
    console.log("Client initialized:", this.client);
  }

  ngOnInit(): void {
    this.setupDrawingCanvas();
    this.setupBabylonScene();
    this.joinGameRoom(); // Join the game room
  }

  joinGameRoom(): void {
    console.log("trying to join game room");
    this.client.getAvailableRooms().then(rooms => {
      console.log("Available rooms:", rooms);
    });    
    this.client.join<GameRoom>("game_room").then(room => {
      this.room = room;

      // Listen for new shapes from other players
      this.room.onMessage("newShape", (message) => {
        const { playerId, vertices } = message;
        // Handle new shape from player
        this.addShapeToScene(vertices);
      });

      this.room.onMessage("playerJoined", (message) => {
        console.log(`Player joined: ${message.id}`);
      });

      this.room.onMessage("playerLeft", (message) => {
        console.log(`Player left: ${message.id}`);
      });

    }).catch(error => {
      console.error("Failed to join room:", error);
    });
  }

  // Set up the 2D drawing canvas
  setupDrawingCanvas(): void {
    const canvas = this.drawingCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error("Failed to get canvas context");
      return; // Exit if the context is not available
    }

    let isDrawing = false;
    this.shapeVertices = [];

    // Mouse events for drawing the shape
    canvas.addEventListener('mousedown', () => {
      isDrawing = true;
      ctx.beginPath(); // Start a new path
    });
    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      if (isDrawing && ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
        this.shapeVertices.push({ x, y });
      }
    });
    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      ctx.closePath(); // Close the path
    });
  }

  // Set up the BabylonJS 3D scene
  setupBabylonScene(): void {
    const canvas = this.babylonCanvasRef.nativeElement;
    this.engine = new BABYLON.Engine(canvas, true);
    this.scene = new BABYLON.Scene(this.engine);

    // Create a basic camera and light
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), this.scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);

    // Create a ground plane for reference
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, this.scene);

    // Render loop
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  // Extrude the shape from the 2D canvas to the 3D scene
  extrudeShape(): void {
    if (this.shapeVertices.length < 3) {
      alert("Please draw a complete shape with at least 3 points!");
      return;
    }

    // Normalize the 2D shape coordinates and create the 3D shape in the local scene
    const extrudePath = [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0)]; // Define extrusion height
    const shape = this.shapeVertices.map(p => new BABYLON.Vector3(p.x / 50 - 4, 0, p.y / 50 - 4)); // Normalize vertices

    this.addShapeToScene(shape); // Add shape to local scene
    if (this.room) {
      // Send shape vertices to the server
      this.room.send("newShape", { playerId: this.room.sessionId, vertices: shape });
    }
    this.shapeVertices = []; // Clear vertices after extruding
  }

  // Function to add shape to the 3D scene
  private addShapeToScene(vertices: BABYLON.Vector3[]): void {
    const extrudePath = [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0)]; // Define extrusion height
    const extrudedMesh = BABYLON.MeshBuilder.ExtrudeShape("extrudedShape", {
      shape: vertices,
      path: extrudePath,
      cap: BABYLON.Mesh.CAP_ALL
    }, this.scene);

    extrudedMesh.position.y = 0.5; // Adjust height above the ground
  }
}
