import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Universite } from '../../../models/universite';
import { UniversiteService } from '../../../services/universite.service';

@Component({
  selector: 'app-listuniversite',
  templateUrl: './listuniversite.component.html',
  styleUrls: ['./listuniversite.component.css']
})
export class ListuniversiteComponent {
 universites: Universite[] = [];
 searchtext: string = '';



  constructor(private universiteService: UniversiteService, private route:Router) {
  }
  ngOnInit() {
    this.universiteService.retreiveAllUniversites().subscribe({
      next: (data) => this.universites = data as Universite[],
      error: (err) => console.log(err),
    })
    console.log(
      "error "
    );
  }



  deleteUniversite(id: number) {
    if (id !== undefined) {
      this.universiteService.removeUniversite(id).subscribe({
        next: () => {
          this.universites = this.universites.filter((c) => c.id !== id);
        },
        error: (err) => console.log(err),
      });
    } else {
      console.error('Invalid universite id:', id);
    }
  }

  updateUniversite(idUniversite: number) {
    this.route.navigate(['universite/updateUniversite',idUniversite]);
       
      }
     
      ngOnDestroy() {
        this. universites= [];
        console.log(this.universites);
        console.log('I m destroyed');
      }

      searchUniversite() {
        this.searchtext != ''
          ? (this.universites = this.universites.filter(
              (u) => u.nomUniversite == this.searchtext
            ))
          : (this.universites = this.universites);
      }
      
      
    
  
    addUniversite() {
      this.route.navigate(['universite/addUniversite']);

     
    }
  }
      
   
    
    
      
 
  

