import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetPublishingComponent } from './dataset-publishing.component';

describe('DatasetPublishingComponent', () => {
  let component: DatasetPublishingComponent;
  let fixture: ComponentFixture<DatasetPublishingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetPublishingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetPublishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
