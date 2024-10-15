import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as BABYLON from 'babylonjs';

@Component({
  selector: 'app-babylon-scene',
  templateUrl: './babylon-scene.component.html',
  styleUrls: ['./babylon-scene.component.css']
})
export class BabylonSceneComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private engine!: BABYLON.Engine;
  private scene!: BABYLON.Scene;
  private selectedVertices: BABYLON.Vector3[] = [];
  private shape!: BABYLON.Mesh;

  ngOnInit(): void {
    this.createScene();
    this.addMouseClickListener();
  }

  createScene(): void {
    const canvas = this.canvasRef.nativeElement;
    this.engine = new BABYLON.Engine(canvas, true);
    this.scene = new BABYLON.Scene(this.engine);

    // Camera and Light setup
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), this.scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);

    // Create ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, this.scene);
    ground.receiveShadows = true;

    // Start rendering the scene
    this.engine.runRenderLoop(() => this.scene.render());
  }

  // Add mouse click listener for drawing shapes
  addMouseClickListener(): void {
    this.canvasRef.nativeElement.addEventListener("click", (event) => {
      const pickResult = this.scene.pick(event.clientX, event.clientY);

      if (pickResult.hit && pickResult.pickedPoint) {
        // Add clicked position to vertices
        this.selectedVertices.push(pickResult.pickedPoint.clone());

        // If 4 points are selected, create the 2D shape
        if (this.selectedVertices.length >= 4) {
          this.extrudeShape();
        }
      }
    });
  }

  // Extrude the 2D shape into 3D
  extrudeShape(): void {
    const path = [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0)]; // Fixed height

    // Create the extruded mesh using the selected vertices
    this.shape = BABYLON.MeshBuilder.ExtrudeShape("shape", {
      shape: this.selectedVertices,
      path: path,
      cap: BABYLON.Mesh.CAP_END
    }, this.scene);

    // Clear the selected vertices for the next shape
    this.selectedVertices = [];
  }
}
