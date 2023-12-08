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

  constructor(private universiteService: UniversiteService, private route: Router,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.universiteService.retreiveAllUniversities().subscribe((universites) => {
      this.universites = universites;
    });

    this.universiteService.getFoyers().subscribe((foyers) => {
      this.foyers = foyers;
    });
  }

  affecterFoyerAUniversite(): void {
    if (this.selectedFoyer && this.selectedUniversite) {
      this.universiteService
        .affecterUniversiteAFoyer(this.selectedFoyer.idFoyer, this.selectedUniversite.nomUniversite)
        .subscribe(
          () => {
            // Affectation réussie, ajoutez ici la logique nécessaire (par exemple, un message de succès)
            console.log('Affectation réussie');
          },
          (error) => {
            // Gestion des erreurs (par exemple, affichage d'un message d'erreur)
            console.error('Erreur lors de l\'affectation', error);
          }
        );
    } else {
      // Gestion des erreurs si les sélections ne sont pas valides
      console.error('Veuillez sélectionner une université et un foyer');
    }
  }

  deleteUniversite(id: number) {
    if (id !== undefined) {
      this.universiteService.removeUniversite(id).subscribe({
        next: () => {
          this.universites = this.universites.filter((u) => u.idUniversite !== id);
        },
        error: (err) => console.log(err),
      });
    } else {
      console.error('Invalid universite id:', id);
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

  affecterUniversiteAFoyer(idFoyer: number, nomUniversite: string) {
    this.universiteService.affecterUniversiteAFoyer(idFoyer, nomUniversite).subscribe(
      () => {
        this.message = 'Affectation réussie';
        // Actualisez la liste des universités après l'affectation réussie
        this.refreshUniversityList();
      },
      (error) => {
        this.message = 'Erreur lors de l\'affectation';
        console.error(error);
      }
    );
  }

  desaffecterUniversiteDeFoyer(idFoyer: number, idUniversite: number) {
    this.universiteService.desaffecterUniversiteDeFoyer(idFoyer, idUniversite).subscribe(
      () => {
        this.message = 'Désaffectation réussie';
        // Actualisez la liste des universités après la désaffectation réussie
        this.refreshUniversityList();
      },
      (error) => {
        this.message = 'Erreur lors de la désaffectation';
        console.error(error);
      }
    );
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
  
 
}



 

