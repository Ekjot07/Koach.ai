import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as BABYLON from 'babylonjs';

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

  ngOnInit(): void {
    this.setupDrawingCanvas();
    this.setupBabylonScene();
  }

  // Set up the 2D drawing canvas
  setupDrawingCanvas(): void {
    const canvas = this.drawingCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    
    let isDrawing = false;
    this.shapeVertices = [];

    // Mouse events for drawing the shape
    canvas.addEventListener('mousedown', () => isDrawing = true);
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
    canvas.addEventListener('mouseup', () => isDrawing = false);
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

    // Normalize the 2D shape coordinates
    const extrudePath = [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0)]; // Define extrusion height
    const shape = this.shapeVertices.map(p => new BABYLON.Vector3(p.x / 50 - 4, 0, p.y / 50 - 4)); // Normalize vertices

    // Create a 3D shape from the drawn vertices
    const extrudedMesh = BABYLON.MeshBuilder.ExtrudeShape("extrudedShape", {
      shape: shape,
      path: extrudePath,
      cap: BABYLON.Mesh.CAP_ALL
    }, this.scene);

    extrudedMesh.position.y = 0.5; // Adjust height above the ground
  }
}
