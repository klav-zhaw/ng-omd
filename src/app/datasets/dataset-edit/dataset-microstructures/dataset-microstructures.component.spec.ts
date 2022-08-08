import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetMicrostructuresComponent } from './dataset-microstructures.component';

describe('DatasetMicrostructuresComponent', () => {
  let component: DatasetMicrostructuresComponent;
  let fixture: ComponentFixture<DatasetMicrostructuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetMicrostructuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetMicrostructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
