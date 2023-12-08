import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChambreService } from 'src/app/services/chambre.service';
import { FoyerService } from 'src/app/services/foyer.service';

@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.css']
})
export class FoyerComponent {
  foyerform!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private foyerServ:FoyerService) {

    this.foyerform = this.fb.group({
      nomFoyer: ["", [Validators.required, Validators.minLength(3)]],

      capacite: ["", [Validators.required]]
    });
  } addFoyer() {
    if (this.foyerform.valid) {
      // Assign the form values to the user object
      this.foyerServ.addFoyer(this.foyerform.getRawValue()).subscribe(() =>
        this.router.navigate(['foyer/foyers'])
      );
    } else {
      // Handle invalid form data
    }
  }
  get nomFoyer() {
    return this.foyerform.get('nomFoyer')!;
  }
  

  get capacite() {
    return this.foyerform.get('capacite');
  }
  
}



