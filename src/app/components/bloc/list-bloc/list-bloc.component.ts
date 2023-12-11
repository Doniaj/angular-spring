import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bloc } from 'src/app/models/bloc';
import { BlocService } from 'src/app/services/bloc.service';
import * as jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
// @ts-ignore
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-list-bloc',
  templateUrl: './list-bloc.component.html',
  styleUrls: ['./list-bloc.component.css']
})
export class ListBlocComponent implements OnInit {
  blocs: Bloc[] = [];
  searchtext: string = '';
  searchedBloc: Bloc | undefined;
  searchId: number | undefined;
  sortedBlocs: Bloc[] = [];
  selectedSortOption: 'id' | 'capacite' = 'id';
  isSorted = false;
  constructor(private blocService: BlocService, private route: Router) {
  }

  ngOnInit() {
    this.blocService.retrieveAllBlocs().subscribe({
      next: (data) => this.blocs = data as Bloc[],
      error: (err) => console.log(err),
    })
    console.log(
      "error "
    );
  }


  deleteBloc(id: number) {
    if (id !== undefined) {
      this.blocService.removeBloc(id).subscribe({
        next: () => {
          this.blocs = this.blocs.filter((c) => c.id !== id);
        },
        error: (err) => console.log(err),
      });
    } else {
      console.error('Invalid bloc id:', id);
    }
  }

  updateBloc(idBloc: number) {
    this.route.navigate(['bloc/updateBloc', idBloc]);

  }
  searchBloc() {
    this.searchtext !=''
      ? (this.blocs = this.blocs.filter(
        (b) => b.nomBloc == this.searchtext))
      : (this.blocs =this.blocs);
  }
  addBloc() {
    this.route.navigate(['bloc/addBloc']);


  }


  // Méthode pour trier les blocs par ID
  sortByBlocId() {
    this.sortedBlocs = [...this.blocs];
    this.sortedBlocs.sort((a, b) => a.id - b.id);
  }

  // Méthode pour trier les blocs par capacité
  sortByCapacite() {
    this.sortedBlocs = [...this.blocs];
    this.sortedBlocs.sort((a, b) => a.capaciteBloc - b.capaciteBloc);
  }

  sortBlocs() {
    if (this.selectedSortOption === 'id') {
      this.sortedBlocs = this.blocs.slice().sort((a, b) => a.id - b.id);
    } else if (this.selectedSortOption === 'capacite') {
      this.sortedBlocs = this.blocs.slice().sort((a, b) => a.capaciteBloc - b.capaciteBloc);
    }

    this.isSorted = true;
  }
  exporterPDF() {
    const doc = new jsPDF.default();
    doc.text('Liste des Blocs', 10, 10);

    // Set initial y position for text
    let yPosition = 20;

    // Iterate through blocs and add content to the PDF
    this.blocs.forEach((bloc) => {
      // Add bloc details
      doc.text(`ID Bloc: ${bloc.id}`, 10, yPosition);
      doc.text(`Nom du Bloc: ${bloc.nomBloc}`, 50, yPosition);
      doc.text(`Capacité Bloc: ${bloc.capaciteBloc}`, 100, yPosition);

      yPosition += 15; // Adjust the spacing
    });

    // Save the PDF
    doc.save('blocs.pdf');
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.blocs);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Adding headers
    const headers = ['ID Bloc', 'Nom du Bloc', 'Capacité Bloc'];
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' });

    XLSX.utils.book_append_sheet(wb, ws, 'Blocs');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'blocs');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }

}

