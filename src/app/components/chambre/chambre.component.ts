import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChambreService } from 'src/app/services/chambre.service';

@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.css']
})
export class ChambreComponent implements OnInit {
  chambreForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private chambreServ: ChambreService) {}

  ngOnInit(): void {
    this.chambreForm = this.fb.group({
      numeroChambre: ["", [Validators.required, Validators.max(999)]],
      typeC: ["", [Validators.required]]
    });
  }

  addChambre() {
    if (this.chambreForm.valid) {
      // Assign the form values to the user object
      this.chambreServ.addChambre(this.chambreForm.getRawValue()).subscribe(() =>
        this.router.navigate(['chambre/chambres'])
      );
    } else {
      // Handle invalid form data
    }
  }

  get numeroChambre() {
    return this.chambreForm.get('numeroChambre')!;
  }

  get typeC() {
    return this.chambreForm.get('typeC');
  }
}
