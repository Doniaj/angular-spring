import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/services/universite.service';

// Assuming you have a Universite class, if not, replace it with your actual class/interface

@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.css']
})
export class UniversiteComponent {
  unversiteForm!: FormGroup;
  imgURL: any;

  userFile: File | undefined;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private universiteServ: UniversiteService
  ) {
    this.unversiteForm = this.fb.group({
      nomUniversite: ["", [Validators.required, Validators.minLength(3)]],
      adresse: ["", [Validators.required]],
      image: ["", [Validators.required]],
    });
  }

 
  addUniversite() {
    if (this.unversiteForm.valid) {
      // Assuming you have a Universite class, if not, replace it with your actual class/interface
      let newUniversite: Universite = new Universite();
      
      newUniversite.nomUniversite = this.unversiteForm.controls['nomUniversite'].value;
      newUniversite.adresse = this.unversiteForm.controls['adresse'].value;
      newUniversite.image = this.unversiteForm.controls['image'].value.replace(/^.*[\\\/]/, '');
  
      this.universiteServ
        .addUniversite(newUniversite)
        .subscribe({next:() =>{
          this.router.navigate(['universite/universites']);alert("university added succes")}})
    } 
  }
  

  get nomUniversite() {
    return this.unversiteForm.get('nomUniversite')!;
  }

  get adresse() {
    return this.unversiteForm.get('adresse');
  }

  get image() {
    return this.unversiteForm.get('image');
  }
}
