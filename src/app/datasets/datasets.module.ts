import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetListComponent } from './dataset-list.component';
import {DatasetsRoutingModule} from './datasets-routing.module';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {DatasetEditModule} from './dataset-edit/dataset-edit.module';
import {CoreModule} from '../core/core.module';
import { DatasetDetailComponent } from './dataset-detail/dataset-detail.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {DatasetInMemoryService} from '../core/dataset-in-memory.service';


@NgModule({
  declarations: [
    DatasetListComponent,
    DatasetDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    InMemoryWebApiModule.forRoot(DatasetInMemoryService),
    DatasetsRoutingModule,
    DatasetEditModule,
    CoreModule
  ]
})
export class DatasetsModule { }
