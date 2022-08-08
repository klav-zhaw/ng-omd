import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetMaterialsComponent } from './dataset-materials.component';

describe('DatasetMaterialsComponent', () => {
  let component: DatasetMaterialsComponent;
  let fixture: ComponentFixture<DatasetMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
