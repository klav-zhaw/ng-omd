import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dataset} from '../../shared/interfaces';
import {DatasetService} from '../../core/dataset.service';
import {Subscription} from 'rxjs';
import {DatasetEditBaseComponent} from './dataset-edit-base/dataset-edit-base.component';

@Component({
  selector: 'app-dataset-edit',
  templateUrl: './dataset-edit.component.html',
  styleUrls: ['./dataset-edit.component.css']
})
export class DatasetEditComponent extends DatasetEditBaseComponent implements OnInit, OnDestroy {
  pageTitle:string = "Upload new Dataset";
  errorMessage = '';

  private dataIsValid: { [key: string]: boolean } = {};

  // get isDirty(): boolean {
  //   return JSON.stringify(this.originalDataset) !== JSON.stringify(this.currentDataset);
  // }


  constructor(datasetService: DatasetService,
              route: ActivatedRoute,
              private router: Router) {
    super(datasetService, route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override onSelectedDatasetChanges(dataset: Dataset | null):void {
    super.onSelectedDatasetChanges(dataset);

    if (!this.dataset) {
      this.pageTitle = 'Dataset not found';
    } else {
      if (this.dataset.id === 0) {
        this.pageTitle = 'Upload New Dataset';
      } else {
        this.pageTitle = `Edit Dataset: ${this.dataset.title}`;
      }
    }
  }

  reset(): void {
    this.dataIsValid = {};
    this.currentDataset = null;
    this.originalDataset = null;
  }



  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'title' tab
    if (this.dataset && this.dataset.title &&
      this.dataset.title.length >= 3) {
      this.dataIsValid['title'] = true;
    } else {
      this.dataIsValid['title'] = false;
    }
    //
    // // 'tags' tab
    // if (this.product.category &&
    //   this.product.category.length >= 3) {
    //   this.dataIsValid['tags'] = true;
    // } else {
    //   this.dataIsValid['tags'] = false;
    // }
  }
  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  saveDataset(): void {
    if (this.dataset && this.isValid()) {
      this.datasetService.saveDataset(this.dataset).subscribe({
          next: () => this.onSaveComplete(`The ${this.dataset?.title} was saved`),
          error: err => this.errorMessage = err
      });
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      console.log("Dataset saved");
      //this.messageService.addMessage(message);
    }
    const id: number | null | undefined = this.dataset?.id;
    this.reset();

    // Navigate to dataset-details site of id
    this.router.navigate(['/datasets/', id]);
  }


  // goToTab(tabToGo: string) {
  //   this.currentTab = tabToGo;
  // }
}
