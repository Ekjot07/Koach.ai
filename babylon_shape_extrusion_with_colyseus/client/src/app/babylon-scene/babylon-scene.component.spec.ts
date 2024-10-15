import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabylonSceneComponent } from './babylon-scene.component';

describe('BabylonSceneComponent', () => {
  let component: BabylonSceneComponent;
  let fixture: ComponentFixture<BabylonSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BabylonSceneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BabylonSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
