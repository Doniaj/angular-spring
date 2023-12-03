// Import NgbModal and NgbModalConfig
import {
  Component,
  OnInit,
  Directive,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  PipeTransform,
} from '@angular/core';
import { Router } from '@angular/router';
import { FoyerService } from '../../../services/foyer.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as Papa from 'papaparse';

import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
interface Foyer {
  id: number;
  nomFoyer: string;
  capacite: number;
}

export type SortColumn = keyof Foyer | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-listfoyers',
  templateUrl: './listfoyers.component.html',
  standalone: true,
  imports: [
    DecimalPipe,
    AsyncPipe,
    ReactiveFormsModule,
    NgbHighlight,
    FormsModule,
    NgbdSortableHeader,
    NgbTypeaheadModule,
    NgbPaginationModule,
  ],
  providers: [DecimalPipe],

  styleUrls: ['./listfoyers.component.css'],
})
export class ListfoyersComponent implements OnInit {
  countries$: Observable<Foyer[]>;
  searchForm: FormGroup;
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  foyers: Foyer[] = [];
  foyerspaged: Foyer[] = [];

  filter = new FormControl('', { nonNullable: true });
  constructor(
    private formBuilder: FormBuilder,
    pipe: DecimalPipe,
    private foyerService: FoyerService,
    private route: Router,
    private modalService: NgbModal, // Inject NgbModal
    config: NgbModalConfig // Inject NgbModalConfig
  ) {
    this.foyerService.retrieveAllfoyers().subscribe({
      next: (data) => {
        this.foyerspaged = data as Foyer[];
        this.collectionSize = this.foyerspaged.length;
      },
      error: (err) => console.log(err),
    });
    // Customize NgbModalConfig
    config.backdrop = 'static';
    config.keyboard = false;
    this.countries$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe))
    );
    this.searchForm = this.formBuilder.group({
      searchInput: [''],
    });
  }

  ngOnInit() {
    this.foyerService.retrieveAllfoyers().subscribe({
      next: (data) => {
        this.foyers = data as Foyer[];
        this.refreshCountries();
      },
      error: (err) => console.log(err),
    });
    this.setupSearch();
  }
  search(text: string, pipe: PipeTransform): Foyer[] {
    return this.foyers.filter((country) => {
      const term = text.toLowerCase();
      return (
        country.nomFoyer.toLowerCase().includes(term) ||
        pipe.transform(country.capacite).includes(term)
      );
    });
  }
  deleteFoyer(id: number) {
    if (id !== undefined) {
      this.foyerService.removeFoyer(id).subscribe({
        next: () => {
          this.foyers = this.foyers.filter((c) => c.id !== id);
        },
        error: (err) => console.log(err),
      });
    } else {
      console.error('Invalid foyer id:', id);
    }
  }

  updateFoyer(idFoyer: number) {
    this.route.navigate(['foyer/updateFoyer', idFoyer]);
  }

  addFoyer() {
    this.route.navigate(['foyer/addFoyer']);
  }

  open(content: any) {
    this.modalService.open(content);
  }
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }

    // sorting countries
    if (direction === '' || column === '') {
      this.foyers;
    } else {
      this.foyers = [...this.foyers].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  setupSearch() {
    this.searchForm
      .get('searchInput')!
      .valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        if (searchTerm.trim() === '') {
          this.foyerService.retrieveAllfoyers().subscribe({
            next: (data) => (this.foyers = data as Foyer[]),
            error: (err) => console.log(err),
          });
        } else {
          this.filterData(searchTerm);
        }
      });
  }
  filterData(searchTerm: string): void {
    // Filter the data based on the search term and update the same variable
    this.foyers = this.foyers.filter(
      (foyer) =>
        foyer.nomFoyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        foyer.capacite
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }
  refreshCountries() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.foyers = this.foyerspaged.slice(startIndex, endIndex);
  }
  exportToCSV() {
    const csvData = Papa.unparse(this.foyers, {
      header: true,
    });

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'foyers.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
