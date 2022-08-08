import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormArray, UntypedFormBuilder, FormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DatasetService} from '../../../core/dataset.service';
import {Dataset} from '../../../shared/interfaces';
import {DatasetEditBaseComponent} from '../dataset-edit-base/dataset-edit-base.component';

@Component({
  selector: 'app-dataset-metadata',
  templateUrl: './dataset-metadata.component.html',
  styleUrls: ['./dataset-metadata.component.css']
})
export class DatasetMetadataComponent extends DatasetEditBaseComponent implements OnInit, OnDestroy {

  errorMessage!: string;

  constructor(datasetService: DatasetService,
              route: ActivatedRoute,
              private router: Router,
              private fb: UntypedFormBuilder) {

    super(datasetService, route);

    this.datasetForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: '',
      authors: this.fb.array([this.buildAuthor('ownerFirstName', 'ownerLastName')]),
      fundingAgency: '',
      grantNumber: '',
      references: this.fb.array([])
    });

  }

  get authors(): UntypedFormArray {
    return <UntypedFormArray>this.datasetForm.get('authors');
  }

  get references(): UntypedFormArray {
    return <UntypedFormArray>this.datasetForm.get('references');
  }

  // ngOnInit(): void {
  //   super().onInit();
  // }
  //
  // ngOnDestroy(): void {
  //   super();
  // }

  buildAuthor(firstName: string = '', lastName: string = '', affiliation: string = '', orcId: string = ''): UntypedFormGroup {
    return this.fb.group({
        firstName: firstName,
        lastName: lastName,
        affiliation: affiliation,
        orcId: orcId
    });
  }

  addAuthor(): void {
    this.authors.push(this.buildAuthor());
  }

  buildReference(): UntypedFormGroup {
    return this.fb.group({
      doi: '',
      citation: ''
    });
  }

  addReference(): void {
    this.references.push(this.buildReference());
  }

  isValid(fieldName: string, i:number = -1) : boolean {
    let theFormControl: AbstractControl | null;
    if (i == -1) {
      theFormControl = this.datasetForm.get(fieldName) as UntypedFormArray;
    } else {
      console.log(fieldName + i);
      theFormControl = this.datasetForm.get(fieldName + i) as UntypedFormArray;
    }

    if (theFormControl) {
      return !((theFormControl!.touched || theFormControl!.dirty) && !theFormControl!.valid);
    } else {
      return true;
    }
  }

  saveDataset():void {
    if (this.datasetForm.valid) {
      if (this.datasetForm.dirty) {
        const theDataset = { ...this.dataset, ...this.datasetForm.value };
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

    console.log('Saved: ' + JSON.stringify(this.datasetForm.value));
  }

  onSaveComplete(): void{
    this.datasetForm!.reset();
    this.router.navigate(['/datasets'])
  }

  getDataset(id: number): void {
    this.datasetService.getDataset(id)
      .subscribe({
        next: (dataset: Dataset) => this.displayDataset(dataset),
        error: err => this.errorMessage = err
      });
  }

  displayDataset(dataset: Dataset): void {
    if (this.datasetForm) {
      this.datasetForm.reset();
    }
    this.dataset = dataset;

    // Update the data on the form
    this.datasetForm.patchValue({
      title: this.dataset.title,
      description: this.dataset.description,
    });
    //this.metadataForm.setControl('authors', this.fb.array(this.dataset.authors || []));
  }

}
