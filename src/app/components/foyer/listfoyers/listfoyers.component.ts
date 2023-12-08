import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chambre } from 'src/app/models/chambre';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/services/foyer.service';

@Component({
  selector: 'app-listfoyers',
  templateUrl: './listfoyers.component.html',
  styleUrls: ['./listfoyers.component.css']
})
export class ListfoyersComponent implements OnInit {
  foyers: Foyer[] = [];

  constructor(private foyerService: FoyerService, private route:Router) { }

  ngOnInit() {
    this.foyerService.retrieveAllfoyers().subscribe({
      next: (data) => this.foyers = data as Foyer[],
      error: (err) => console.log(err),
    })
    console.log(
      "error "
    );
  }
  deleteFoyer(idFoyer: number) {
    if (idFoyer !== undefined) {
      this.foyerService.removeFoyer(idFoyer).subscribe({
        next: () => {
          this.foyers = this.foyers.filter((f )=> f.idFoyer !== idFoyer);
        },
        error: (err) => console.log(err),
      });
    } else {
      console.error('Invalid foyer id:', idFoyer);
    }
  }

  updateFoyer(idFoyer: number) {
    this.route.navigate(['foyer/updateFoyer',idFoyer]);
       
      }
  addFoyer(){
    this.route.navigate(['foyer/addFoyer']);
  }
}