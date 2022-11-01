import { Component, OnInit } from '@angular/core';
import {DatasetEditBaseComponent} from '../dataset-edit-base/dataset-edit-base.component';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {DatasetService} from '../../../core/dataset.service';

@Component({
  selector: 'app-dataset-fabrication',
  templateUrl: './dataset-fabrication.component.html',
  styleUrls: ['./dataset-fabrication.component.css']
})
export class DatasetFabricationComponent extends DatasetEditBaseComponent implements OnInit {

  constructor(datasetService: DatasetService,
            route: ActivatedRoute,
            router: Router,
            private fb: UntypedFormBuilder) {

    super(datasetService, route, router);

    this.microstructureForm = this.fb.group({

    });
  }

  override ngOnInit(): void {
  }

}
