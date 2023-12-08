import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Foyer } from 'src/app/models/foyer';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/services/universite.service';

@Component({
  selector: 'app-listuniversite',
  templateUrl: './listuniversite.component.html',
  styleUrls: ['./listuniversite.component.css']
})
export class ListuniversiteComponent {
  universites: Universite[] = [];
  searchtext: string = '';
  imgURL:any;
  newEvent: any = {}; // Object to hold new product data
  sorted: boolean = false;
  selectedSortCriteria: string = 'nomUniversite';

  userFile: File | undefined;
 message: string = ''; 
  foyer!: Foyer;
  selectedUniversite!: Universite;
  selectedFoyer!: Foyer;
  foyers!: Foyer[];
  searchTerm: string = "";
  logs: string[] = [];
  logsVisibles: boolean = false;

  constructor(private universiteService: UniversiteService, private route: Router,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.universiteService.retreiveAllUniversities().subscribe((universites) => {
      this.universites = universites;
    });

    this.universiteService.getFoyers().subscribe((foyers) => {
      this.foyers = foyers;
    });
  }

  
  deleteUniversite(idUniversite: number) {
    if (idUniversite !== undefined) {
      this.universiteService.removeUniversite(idUniversite).subscribe({
        next: () => {
          this.universites = this.universites.filter((u) => u.idUniversite !== idUniversite);
          // Filtrer automatiquement après la suppression
          this.filterUniversites();
        },
        error: (err) => console.log(err),
      });
    } else {
      console.error('Invalid universite id:', idUniversite);
    }
  }
  
  private filterUniversites() {
    if (this.searchtext !== '') {
      this.universites = this.universites.filter((u) =>
        u.nomUniversite.toLowerCase().includes(this.searchtext.toLowerCase())
      );
    }
  }
     

  updateUniversite(idUniversite: number) {
    this.route.navigate(['universite/updateUniversite', idUniversite]);
  }

  ngOnDestroy() {
    this.universites = [];
    console.log(this.universites);
    console.log('I m destroyed');
  }

  searchUniversite() {
    this.searchtext != ''
      ? (this.universites = this.universites.filter((u) => u.nomUniversite == this.searchtext))
      : (this.universites = this.universites);
  }

  addUniversite() {
    this.route.navigate(['universite/addUniversite']);
  }



 
 

  private refreshUniversityList() {
    this.universiteService.retreiveAllUniversities().subscribe({
      next: (data) => this.universites = data as Universite[],
      error: (err) => console.log(err),
    });
  }
  getImageUrl(image: string): string {
    const imageUrl = `assets/images/` + image;
    return imageUrl;
  }
  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newEvent.image = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/)== null) {
        this.message = 'Only images are supported.';
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
  sortUniversites() {
    if (!this.sorted) {
      this.universites.sort((a, b) => {
        return a.nomUniversite.localeCompare(b.nomUniversite);
      });
    } else {
      // Si déjà trié, inversez l'ordre
      this.universites.sort((a, b) => {
        return b.nomUniversite.localeCompare(a.nomUniversite);
      });
    }
  
    this.sorted = !this.sorted;
  }
  ///////////////////affectation////////////////////////////
  affecterFoyerAUniversite(idFoyer: number, nomUniversite: string): void {
    this.universiteService.affecterFoyerAUniversite(idFoyer, nomUniversite).subscribe(
      (universite: any) => {
        // Traitement réussi, mettez à jour votre interface utilisateur si nécessaire
        console.log("Affectation réussie :", universite);
      },
      (error) => {
        // Gérez les erreurs ici
        console.error("Erreur lors de l'affectation :", error);
        // Affichez un message d'erreur à l'utilisateur ou faites une action appropriée
        this.message = 'Erreur lors de l\'affectation : ' + error.message;
      }
    );
  }
  

  onOptionSelectionChange(event:any, u:Universite) {
    const idSelectedFoyer = event.target.value;
    console.log(idSelectedFoyer);
  
    this.foyers = this.foyers.filter(foyer => foyer.idFoyer != idSelectedFoyer);
  
    this.universiteService
      .affecterFoyerAUniversite(idSelectedFoyer, u.nomUniversite)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }


 
}



 

