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

  constructor(datasetService: DatasetService,
              route: ActivatedRoute,
              router: Router,
              private fb: UntypedFormBuilder) {

    super(datasetService, route, router);

    this.microstructureForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: '',
      authors: this.fb.array([this.buildAuthor('ownerFirstName', 'ownerLastName')]),
      fundings: this.fb.array([]),
      references: this.fb.array([])
    });

  }

  get authors(): UntypedFormArray {
    return <UntypedFormArray>this.microstructureForm.get('authors');
  }

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


  get fundings(): UntypedFormArray {
    return <UntypedFormArray>this.microstructureForm.get('fundings');
  }

  buildFunding(): UntypedFormGroup {
    return this.fb.group({
      fundingAgency: '',
      grantNumber: ''
    });
  }

  addFunding(): void {
    this.fundings.push(this.buildFunding());
  }


  get references(): UntypedFormArray {
    return <UntypedFormArray>this.microstructureForm.get('references');
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



  isFieldValid(fieldName: string, i:number = -1) : boolean {
    let theFormControl: AbstractControl | null;
    if (i == -1) {
      theFormControl = this.microstructureForm.get(fieldName) as UntypedFormArray;
    } else {
      console.log(fieldName + i);
      theFormControl = this.microstructureForm.get(fieldName + i) as UntypedFormArray;
    }

    if (theFormControl) {
      return !((theFormControl!.touched || theFormControl!.dirty) && !theFormControl!.valid);
    } else {
      return true;
    }
  }


  // saveAndGotoNext(): void {
  //   this.router.navigate(['datasets', this.dataset?.id, 'edit', 'dataset-materials'])
  // }


  // saveDataset():void {
  //   if (this.microstructureForm.valid) {
  //     if (this.microstructureForm.dirty) {
  //       const theDataset = { ...this.dataset, ...this.microstructureForm.value };
  //       this.datasetService.saveDataset(theDataset)
  //         .subscribe({
  //           next: () => this.onSaveComplete(),
  //           error: err => this.errorMessage = err
  //       });
  //     } else {
  //       this.onSaveComplete();
  //     }
  //   } else {
  //     this.errorMessage = 'Please correct the validation errors.';
  //   }
  //
  //   console.log('Saved: ' + JSON.stringify(this.microstructureForm.value));
  // }
  //
  // onSaveComplete(): void{
  //   this.microstructureForm!.reset();
  //   this.router.navigate(['/datasets'])
  // }

  getDataset(id: number): void {
    this.datasetService.getDataset(id)
      .subscribe({
        next: (dataset: Dataset) => this.displayDataset(dataset),
        error: err => this.errorMessage = err
      });
  }

  displayDataset(dataset: Dataset): void {
    if (this.microstructureForm) {
      this.microstructureForm.reset();
    }
    this.dataset = dataset;

    // Update the data on the form
    this.microstructureForm.patchValue({
      title: this.dataset.title,
      description: this.dataset.description,
    });
    //this.metadataForm.setControl('authors', this.fb.array(this.dataset.authors || []));
  }

}
