import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dataset, DatasetResolved} from '../../shared/interfaces';
import {ActivatedRoute} from '@angular/router';
import {DatasetService} from '../../core/dataset.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dataset-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit, OnDestroy {

  pageTitle = 'Dataset Detail';
  dataset: Dataset | null = null;
  errorMessage: string = '';
  subscription!: Subscription;

  constructor(//private route: ActivatedRoute,
              private datasetService: DatasetService) { }

  ngOnInit(): void {
    this.subscription = this.datasetService.selectedDatasetChanges$.subscribe(
      selectedDataset => this.onDatasetRetrieved(selectedDataset)
    );
    // const resolvedData: DatasetResolved = this.route.snapshot.data['resolvedData'];
    // if (resolvedData.error) {
    //   this.errorMessage = resolvedData.error;
    // } else {
    //   this.errorMessage = '';
    // }
    // if (resolvedData.dataset) {
    //   this.onDatasetRetrieved(resolvedData.dataset);
    // }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDatasetRetrieved(dataset: Dataset | null): void {
    this.dataset = dataset;

    if (this.dataset) {
      this.pageTitle = `Dataset Detail: ${this.dataset.title}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

}
