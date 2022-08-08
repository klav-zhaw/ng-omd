import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetEditBaseComponent } from './dataset-edit-base.component';

describe('DatasetEditBaseComponent', () => {
  let component: DatasetEditBaseComponent;
  let fixture: ComponentFixture<DatasetEditBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetEditBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetEditBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
