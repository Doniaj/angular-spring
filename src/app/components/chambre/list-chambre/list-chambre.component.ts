import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Chambre } from 'src/app/models/chambre';
import { ChambreService } from 'src/app/services/chambre.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-list-chambre',
  templateUrl: './list-chambre.component.html',
  styleUrls: ['./list-chambre.component.css']
})
export class ListChambreComponent implements OnInit {
  chambres: Chambre[] = [];
  searchtext: string = '';
  sorted: boolean = false;
  selectedSortCriteria: string = 'numeroChambre';
  paginatedChambres: Chambre[] = [];
  itemsPerPage = 5;
  currentPage = 1;
  

  constructor(private chambreService: ChambreService, private route:Router) { }

  ngOnInit() {
    this.chambreService.retrieveAllChambres().subscribe({
      next: (data) => this.chambres = data as Chambre[],
      error: (err) => console.log(err),
    })
    console.log(
      "error "
    );
  }

  
  deleteChambre(id: number) {
    if (id !== undefined) {
      this.chambreService.removeChambre(id).subscribe({
        next: () => {
          this.chambres = this.chambres.filter((c) => c.id !== id);
        },
        error: (err) => console.log(err),
      });
    } else {
      console.error('Invalid chambre id:', id);
    }
  }
  updateChambre(idChambre: number) {
    this.route.navigate(['chambre/updateChambre',idChambre]);
       
      }
      
      searchChambre() {
        this.searchtext != ''
          ? (this.chambres = this.chambres.filter(
              (c) => c.typeC == this.searchtext
            ))
          : (this.chambres = this.chambres);
      }

      addChambre() {
        this.route.navigate(['chambre/addChambre']);
  
       
      }

      sortChambres() {
        if (!this.sorted) {
          this.chambres.sort((a, b) => {
            if (this.selectedSortCriteria === 'numeroChambre') {
              return a.numeroChambre - b.numeroChambre;
            } else if (this.selectedSortCriteria === 'typeC') {
              return a.typeC.localeCompare(b.typeC);
            }
            return 0; 
          });
        } else {
          // Si déjà trié, inversez l'ordre
          this.chambres.sort((a, b) => {
            if (this.selectedSortCriteria === 'numeroChambre') {
              return b.numeroChambre - a.numeroChambre;
            } else if (this.selectedSortCriteria === 'typeC') {
              return b.typeC.localeCompare(a.typeC);
            }
            return 0; 
          });
        }
      
        this.sorted = !this.sorted;
      }

      generatePdf() {
        const doc = new jsPDF.default();

        
        doc.setDrawColor(0, 100, 0); //couleur bordure
      
        doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10);
      
      
        doc.setFontSize(20); 
        doc.setFont('times', 'bold'); 
        doc.setTextColor(0, 128, 0); 
      
        const centerX = doc.internal.pageSize.width / 2;
      
        doc.text('Liste des Chambres', centerX, 30, { align: 'center' });
      
        let yPos = 40;
      
        this.chambres.forEach((chambre, index) => {
          yPos += 10;
      
          // card
          doc.setFillColor(144, 238, 144); 
          const cardWidth = 150;
          const cardCenterX = centerX - cardWidth / 2;
          doc.rect(cardCenterX, yPos, cardWidth, 30, 'F'); 
      
          // design des  champs
          doc.setFont('times', 'normal');
          doc.setFontSize(10); 
          doc.setTextColor(0, 0, 0); 
      
          // liste chambres
          doc.text(`ID: ${chambre.id}`, centerX, yPos + 10, { align: 'center' });
          doc.text(`Numéro: ${chambre.numeroChambre}`, centerX, yPos + 20, { align: 'center' });
          doc.text(`Type: ${chambre.typeC}`, centerX, yPos + 30, { align: 'center' });
      
          yPos += 40;
        });

        doc.save('ListeDesChambres.pdf');
        window.alert('Votre liste sera téléchargée');
      }

      
}