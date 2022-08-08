import { Injectable } from '@angular/core';
import {Dataset} from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatasetInMemoryService {

  constructor() { }
  createDb() {
    const datasets: Dataset[] = [
      {
        id: 1,
        title: 'The First dataset',
        description: 'The first description'
      }
    ]
    return {datasets};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  // genId(datasets: Dataset[]): number {
  //   return datasets.length > 0 ? Math.max(...datasets.map(dataset => dataset.id)) + 1 : 42;
  // }
}
