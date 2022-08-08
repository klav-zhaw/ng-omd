import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DatasetListComponent} from './dataset-list.component';
import {DatasetEditComponent} from './dataset-edit/dataset-edit.component';
import {DatasetDetailComponent} from './dataset-detail/dataset-detail.component';
import {DatasetMetadataComponent} from './dataset-edit/dataset-metadata/dataset-metadata.component';
import {DatasetMaterialsComponent} from './dataset-edit/dataset-materials/dataset-materials.component';
import {
  DatasetMicrostructuresComponent
} from './dataset-edit/dataset-microstructures/dataset-microstructures.component';
import {DatasetFabricationComponent} from './dataset-edit/dataset-fabrication/dataset-fabrication.component';
import {DatasetPropertiesComponent} from './dataset-edit/dataset-properties/dataset-properties.component';
import {DatasetPublishingComponent} from './dataset-edit/dataset-publishing/dataset-publishing.component';


const routes: Routes = [
  {
    path: 'datasets',
    children: [
      { path: '', component: DatasetListComponent },
      { path: ':id/edit', component: DatasetEditComponent, // resolve: {resolvedData: DatasetResolver},
        children: [
          {path: '', redirectTo: 'dataset-meta', pathMatch: 'full'},
          {path: 'dataset-meta', component: DatasetMetadataComponent},
          {path: 'dataset-materials', component: DatasetMaterialsComponent},
          {path: 'dataset-microstructures', component: DatasetMicrostructuresComponent},
          {path: 'dataset-fabrication', component: DatasetFabricationComponent},
          {path: 'dataset-properties', component: DatasetPropertiesComponent},
          {path: 'dataset-publishing', component: DatasetPublishingComponent},
        ]
      },
      { path: ':id', component: DatasetDetailComponent} //, resolve: {resolvedData: DatasetResolver} },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasetsRoutingModule { }
