import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Chambre } from '../../../models/chambre';
import { ChambreService } from '../../../services/chambre.service';

@Component({
  selector: 'app-list-chambre',
  templateUrl: './list-chambre.component.html',
  styleUrls: ['./list-chambre.component.css']
})
export class ListChambreComponent implements OnInit {
  chambres: Chambre[] = [];

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
      

}