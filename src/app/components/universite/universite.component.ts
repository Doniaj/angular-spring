import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChambreService } from '../../services/chambre.service';
import { UniversiteService } from '../../services/universite.service';

@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.css']
})
export class UniversiteComponent {
  unversiteForm!: FormGroup;
  img!: File | undefined;

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
      // Assign the form values to the user object
      this.universiteServ
        .addUniversite(this.unversiteForm.getRawValue())
        .subscribe(() => this.router.navigate(['universite/universites']));
    } else {
      // Handle invalid form data
    }
  }

  onImageSelected(event: any) {
    this.img = event.target.files[0];
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

  getImageUrl(): string | null {
    if (this.img) {
      return URL.createObjectURL(this.img);
    }
    return null;
  }
}