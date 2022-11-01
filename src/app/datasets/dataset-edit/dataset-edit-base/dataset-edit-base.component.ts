import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatasetService} from '../../../core/dataset.service';
import {Subscription} from 'rxjs';
import {Dataset} from '../../../shared/interfaces';
import {AbstractControl, UntypedFormArray, UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

@Component({
  selector: 'app-dataset-edit-base',
  template: '',
})
export class DatasetEditBaseComponent implements OnInit, OnDestroy {
  public microstructureForm!: UntypedFormGroup;
  protected subscription!: Subscription;

  protected currentDataset!: Dataset | null;
  protected originalDataset!: Dataset | null;
  protected errorMessage: string = "";
  protected tabs = ['dataset-meta', 'dataset-materials', 'dataset-microstructures', 'dataset-fabrication', 'dataset-properties', 'dataset-publishing']

  get dataset(): Dataset | null {
    return this.currentDataset;
  }
  set dataset(value: Dataset | null) {
    this.currentDataset = value;
    // Clone the object to retain a copy
    this.originalDataset = value ? { ...value } : null;
  }


  constructor(protected datasetService: DatasetService,
              protected route: ActivatedRoute,
              protected router: Router) { }

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

  onSaveComplete(): void{
    this.microstructureForm!.reset();
    this.router.navigate(['/datasets'])
  }

  getCurrentTab(): string {
    return this.router.url.split('/').pop()!;
  }

  getNewTab(i=0): string {
    let currentTabIndex = 0;
    currentTabIndex = this.tabs.indexOf(this.getCurrentTab());
    if (currentTabIndex + i >= 0 && currentTabIndex + i < this.tabs.length)
      return this.tabs[currentTabIndex + i];
    return '';
  }


  saveDataset():void {
    if (this.microstructureForm.valid) {
      if (this.microstructureForm.dirty) {
        const theDataset = { ...this.dataset, ...this.microstructureForm.value };
        this.datasetService.saveDataset(theDataset)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
        });
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }

    console.log('Saved: ' + JSON.stringify(this.microstructureForm.value));
  }

  saveAndGotoTab(theTabLink: string): void {
    this.router.navigate(['datasets', this.dataset?.id, 'edit', theTabLink])
  }


}
