import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetMetadataComponent } from './dataset-metadata.component';

describe('DatasetMetadataComponent', () => {
  let component: DatasetMetadataComponent;
  let fixture: ComponentFixture<DatasetMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetMetadataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
