import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetFabricationComponent } from './dataset-fabrication.component';

describe('DatasetFabricationComponent', () => {
  let component: DatasetFabricationComponent;
  let fixture: ComponentFixture<DatasetFabricationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetFabricationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetFabricationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
