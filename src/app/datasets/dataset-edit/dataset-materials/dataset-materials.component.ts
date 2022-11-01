import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DatasetService} from '../../../core/dataset.service';
import {DatasetEditBaseComponent} from '../dataset-edit-base/dataset-edit-base.component';
import {UntypedFormBuilder, UntypedFormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, Observable, startWith} from 'rxjs';



// interface MaterialApplication {
//   value: string;
//   viewValue: string;
// }
//
// interface MaterialApplicationGroup {
//   disabled?: boolean;
//   name: string;
//   materialApplication: MaterialApplication[];
// }

@Component({
  selector: 'app-dataset-materials',
  templateUrl: './dataset-materials.component.html',
  styleUrls: ['./dataset-materials.component.css']
})
export class DatasetMaterialsComponent extends DatasetEditBaseComponent implements OnInit, OnDestroy {

  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keywordsCtrl = new UntypedFormControl('');
  filteredKeywords!: Observable<string[]>;
  materialKeywords: string[] = [];
  allKeywords: string[] = [];

  materialApplication = [
    'Energy materials (battery, fuel cells, etc)',
    'Biomedical (implants, pharma, etc)',
    'Chemical engineering (separation, filtration etc)',
    'Agro-, nutrition-, food-industries',
    'Environmental-, Geo-, Civil-engineering',
    'Aviation, automotive, transportation',
    'Electronics, photonics, optics, magnetics',
    'Coatings, (thin)films, surface modifications',
    'Other applications:'];

  energyMaterials: string[] = [
    'Batteries - Lithium ion',
    'Batteries - Redox flow',
    'Batteries - Other:',
    'Fuel cells- PEM',
    'Fuel cells- SOFC',
    'Fuel cells- Other:',
    'Other'];



  @ViewChild('keywordInput')
  keywordInput!: ElementRef<HTMLInputElement>;

  constructor(datasetService: DatasetService,
              route: ActivatedRoute,
              router: Router,
              private fb: UntypedFormBuilder) {

    super(datasetService, route, router);

    this.filteredKeywords = this.keywordsCtrl.valueChanges.pipe(
      startWith(null),
      map((keyword: string | null) => (keyword ? this._filter(keyword): this.allKeywords.slice())),
    );

    this.microstructureForm = this.fb.group({
      keywords: [],
      materialApplication: '',
      materialApplicationOther: '',
      energyMaterial: '',
      energyMaterialOther: '',
      energyMaterialBatOther: '',
      energyMaterialFuelOther: ''
      // materialDescription: '',
      // materialClassification: '',
      // materialApplicationField: '',
      // interestingProperties: '',
    });

  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }



  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.materialKeywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.keywordsCtrl.setValue(null);
  }

  remove(keyword: string): void {
    const index = this.materialKeywords.indexOf(keyword);

    if (index >= 0) {
      this.materialKeywords.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.materialKeywords.push(event.option.viewValue);
    this.keywordInput.nativeElement.value = '';
    this.keywordsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allKeywords.filter(keyword => keyword.toLowerCase().includes(filterValue));
  }
}
