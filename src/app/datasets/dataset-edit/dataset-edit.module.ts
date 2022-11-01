import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetEditComponent } from './dataset-edit.component';
import { DatasetMetadataComponent } from './dataset-metadata/dataset-metadata.component';
import { DatasetMaterialsComponent } from './dataset-materials/dataset-materials.component';
import { DatasetMicrostructuresComponent } from './dataset-microstructures/dataset-microstructures.component';
import { DatasetFabricationComponent } from './dataset-fabrication/dataset-fabrication.component';
import { DatasetPropertiesComponent } from './dataset-properties/dataset-properties.component';
import { DatasetPublishingComponent } from './dataset-publishing/dataset-publishing.component';
import {RouterModule} from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import {ReactiveFormsModule} from '@angular/forms';
import { DatasetEditBaseComponent } from './dataset-edit-base/dataset-edit-base.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [
    DatasetEditComponent,
    DatasetMetadataComponent,
    DatasetMaterialsComponent,
    DatasetMicrostructuresComponent,
    DatasetFabricationComponent,
    DatasetPropertiesComponent,
    DatasetPublishingComponent,
    DatasetEditBaseComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatTableModule
    ]
})
export class DatasetEditModule { }
