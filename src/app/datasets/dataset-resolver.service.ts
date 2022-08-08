import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {DatasetResolved} from '../shared/interfaces';
import {DatasetService} from '../core/dataset.service';

@Injectable({
  providedIn: 'root',
})
export class DatasetResolver implements Resolve<DatasetResolved> {
  constructor(private datasetService: DatasetService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DatasetResolved> {
    const id = route.paramMap.get('id');
    if (id && isNaN(+id)) {
      const message = `Dataset id was not a number: ${id}`;
      console.error(message);
      return of({ dataset: undefined, error: message });
    }
    if (id) {
      return this.datasetService.getDataset(+id).pipe(
        map(dataset => ({dataset})),
        catchError(err => {
          const message = `Retrieval error: ${err}`;
          console.error(message);
          return of({dataset: undefined, error: message});
        })
      );
    }
    return of({dataset: undefined, error: "no id"});
  }
}
