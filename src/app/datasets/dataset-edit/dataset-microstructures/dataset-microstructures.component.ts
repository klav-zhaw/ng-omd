import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DatasetService} from '../../../core/dataset.service';
import {DatasetEditBaseComponent} from '../dataset-edit-base/dataset-edit-base.component';

@Component({
  selector: 'app-dataset-microstructures',
  templateUrl: './dataset-microstructures.component.html',
  styleUrls: ['./dataset-microstructures.component.css']
})
export class DatasetMicrostructuresComponent extends DatasetEditBaseComponent implements OnInit {

  dimensions = ['3D (single image)', '2D-stack with 3D information (folder)', '2D (single image)'];
  resolutionUnits = ['nm', 'um', 'mm']
  segmentation = ['segmented (preferred)', 'non-segmented']

  constructor(datasetService: DatasetService,
            route: ActivatedRoute,
            router: Router,
            private fb: UntypedFormBuilder) {

    super(datasetService, route, router);


    this.microstructureForm = this.fb.group({
      microstructures: this.fb.array([this.buildMicrostructure('', '')])
    });

  }

  get microstructures(): UntypedFormArray {
    return <UntypedFormArray>this.microstructureForm.get('microstructures');
  }

  buildMicrostructure(origin: string = '', comment: string = '', sampleName = '', sampleLocality = 'a', dimension: string = '', resolution: string = '', resolutionUnit: string = '', segmentation: string = '', nbPhases=2, phasecomposition: string = '', imageFile = null, geodictFile = null): UntypedFormGroup {
    return this.fb.group({
      origin: origin,
      comment: comment,
      sampleName: sampleName,
      sampleLocality: sampleLocality,
      dimension: dimension,
      resolution: resolution,
      resolutionUnit: resolutionUnit,
      segmentation: segmentation,
      nbPhases: nbPhases,
      phasecompositions: this.fb.array([this.buildPhase(), this.buildPhase()]),
      imageFile: [imageFile, Validators.required],
      geodictFile: geodictFile
    })
  }

  addMicrostructure(): void {
      this.microstructures.push(this.buildMicrostructure())
  }

  buildPhase(phaseMaterial= '', phaseValue= 0): UntypedFormGroup {
    return this.fb.group({
      phaseMaterial: phaseMaterial,
      phaseValue: phaseValue
    })
  }

  addPhase(i: number): void {
    this.microstructures.at(i).get('phasecompositions')?.value.push(this.buildPhase());

  }

  override ngOnInit(): void {
      super.ngOnInit()
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }



}
