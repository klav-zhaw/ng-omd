import { Component, OnInit } from '@angular/core';
import {Dataset} from '../shared/interfaces';
import {ActivatedRoute, Route} from '@angular/router';
import {DatasetService} from '../core/dataset.service';

@Component({
  selector: 'app-datasets',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.css']
})
export class DatasetListComponent implements OnInit {
  pageTitle = 'Datasets';
  datasets: Dataset[] = [];
  filteredDatasets: Dataset[] = [];
  errorMessage = '';
  showThumbnail = true;
  imageWidth = 50;
  imageMargin = 2;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDatasets = this.listFilter ? this.performFilter(this.listFilter) : this.datasets;
  }


  constructor(private route:ActivatedRoute,
              private datasetService: DatasetService) { }

  ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';

    this.datasetService.getDatasets().subscribe({
      next: datasets => {
        this.datasets = datasets;
        this.filteredDatasets = this.performFilter(this.listFilter);
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): Dataset[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.datasets.filter((dataset: Dataset) =>
      dataset.title?.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleThumbnail() {
    this.showThumbnail = !this.showThumbnail;
  }

  onSelected(dataset: Dataset) {
    this.datasetService.changeSelectedDataset(dataset);
  }
}
