import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from 'rxjs';
//import {map, catchError} from 'rxjs/operators';

import {MicroStructure, Dataset, Author} from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {

  baseUrl: string = 'assets/';
  private datasetsUrl: string = "api/datasets";

  private _datasets!: Dataset[];
  private _selectedDatasetSource = new BehaviorSubject<Dataset|null>(null);
  selectedDatasetChanges$ = this._selectedDatasetSource.asObservable();


  constructor(private http: HttpClient) {
  }

  changeSelectedDataset(selectedDataset: Dataset|null):void {
    this._selectedDatasetSource.next(selectedDataset);
  }

  getDatasets(): Observable<Dataset[]> {
    if (this._datasets) {
      return of(this._datasets);
    }

    return this.http.get<Dataset[]>(this.datasetsUrl).pipe(
      tap(data => console.log(JSON.stringify(data))),
      tap(data => this._datasets = data),
      catchError(this.handleError)
    );
  }


  getDataset(id: number, changeSelectedDataset: boolean = true): Observable<Dataset> {
    if (id === 0) {
      // if (changeSelectedDataset) {
      //   this.changeSelectedDataset(this.initializeDataset());
      // }
      return of(this.initializeDataset());
    }
      console.log("***get dataset id " + id);

    const url = `${this.datasetsUrl}/${id}`;

    if (this._datasets) {
      const foundItem = this._datasets.find(item => item.id === id);
      if (foundItem) {
        if (changeSelectedDataset) {
          this.changeSelectedDataset(foundItem);
        }
        return of(foundItem);
      }

    }
    return this.http.get<Dataset>(url).pipe(
      tap(data => console.log('getDataset: ' + JSON.stringify(data))),
      tap(data => this.changeSelectedDataset(data)),
      catchError(this.handleError)
    );
  }

  getMicrostructures(id: number): Observable<MicroStructure[]> {
    // return this.http.get<IMicroStructure[]>(this.baseUrl + 'microstructures.json')
    //   .pipe(
    //     map(microstructures => {
    //       let microstructure = customers.filter((dataset: IDataset) => dataset.id === id);
    //       return (customer && customer.length) ? customer[0] : null;
    //     }),
    //     catchError(this.handleError)
    //   )
    return this.http.get<MicroStructure[]>(this.baseUrl + 'microstructures.json');
  }

  // private handleError(error: any) {
  //   console.error('server error:', error);
  //   if (error.error instanceof Error) {
  //     const errMessage = error.error.message;
  //     return Observable.throw(errMessage);
  //     // Use the following instead if using lite-server
  //     // return Observable.throw(err.text() || 'backend server error');
  //   }
  //   return Observable.throw(error || 'Node.js server error');
  // }

  private initializeDataset(): Dataset {
    return {
      id: 0,
      title: undefined,
      description: undefined,
      //authors: Author[] = [{firstName: undefined, lastName: undefined}],
    };
  }

  private createDataset(dataset: Dataset, headers: HttpHeaders): Observable<Dataset> {
    dataset.id = null;
    return this.http.post<Dataset>(this.datasetsUrl, dataset, { headers }).pipe(
      tap(data => console.log('createProduct: ' + JSON.stringify(data))),
      tap(data => {
        this._datasets.push(data);
        this.changeSelectedDataset(data);
      }),
      catchError(this.handleError)
    );

  }

  private updateDataset(dataset: Dataset, headers: HttpHeaders): Observable<Dataset> {
    const url = `${this.datasetsUrl}/${dataset.id}`;
    return this.http.put<Dataset>(url, dataset, { headers })
      .pipe(
        tap(() => console.log('updateDataset: ' + dataset.id)),
        // Return the product on an update
        tap(data => {
          this.saveDatasetDraft(data);
        }),
        catchError(this.handleError)
      );
  }


  saveDataset(dataset: Dataset): Observable<Dataset> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (dataset.id === 0) {
        return this.createDataset(dataset, headers);
    }
    return this.updateDataset(dataset, headers);
  }

  saveDatasetDraft(dataset: Dataset): void {
    this.changeSelectedDataset(dataset);
    if (dataset.id && dataset.id > 0) {
      const itemIndex = this._datasets.findIndex(item => item.id === dataset.id);
      this._datasets.splice(itemIndex, 1, dataset);
    }
    this.changeSelectedDataset(dataset);
  }

  deleteDataset(id: number): Observable<Dataset> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.datasetsUrl}/${id}`;
    return this.http.delete<Dataset>(url, { headers }).pipe(
      tap(data => console.log('deleteProduct: ' + id)),
      tap(data => {
        const foundIndex = this._datasets.findIndex(item => item.id === id);
        if (foundIndex > -1) {
          this._datasets.splice(foundIndex, 1);
          this.changeSelectedDataset(null);
        }
      })
    );

  }


  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
