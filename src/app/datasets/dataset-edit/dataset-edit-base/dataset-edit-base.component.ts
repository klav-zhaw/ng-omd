import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatasetService} from '../../../core/dataset.service';
import {Subscription} from 'rxjs';
import {Dataset} from '../../../shared/interfaces';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

@Component({
  selector: 'app-dataset-edit-base',
  template: '',
})
export class DatasetEditBaseComponent implements OnInit, OnDestroy {
  public datasetForm!: FormGroup;
  protected subscription!: Subscription;

  protected currentDataset!: Dataset | null;
  protected originalDataset!: Dataset | null;

  get dataset(): Dataset | null {
    return this.currentDataset;
  }
  set dataset(value: Dataset | null) {
    this.currentDataset = value;
    // Clone the object to retain a copy
    this.originalDataset = value ? { ...value } : null;
  }


  constructor(protected datasetService: DatasetService,
              protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.datasetService.selectedDatasetChanges$.subscribe(
      selectedDataset => this.onSelectedDatasetChanges(selectedDataset)
    )
    this.datasetService.getDataset(0).subscribe(dataset =>
      this.onSelectedDatasetChanges(dataset)
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onSelectedDatasetChanges(dataset: Dataset | null): void {
    // TODO: if dataset != null, perform save action or sth.?
    this.dataset = dataset;

  }

}
