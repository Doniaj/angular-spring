import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  signupForm!: FormGroup ;
  u !:User;

  constructor(private fb: FormBuilder,private userserv:UserService,private route:Router) {
    
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
      'nom': ['', Validators.required],
      'prenom': ['', Validators.required],
      'email': ['', Validators.required],
      'adresse': ['', Validators.required],
      'dateNaissance': ['', Validators.required],

      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirmPassword': ['', Validators.required]
    }
    )

    }
    
    register() {
      let usr = new User()
      usr.nom = this.signupForm.controls['nom'].value
      usr.prenom = this.signupForm.controls['prenom'].value
      usr.adresse = this.signupForm.controls['adresse'].value
      usr.dateNaissance = this.signupForm.controls['dateNaissance'].value
      usr.email = this.signupForm.controls['email'].value

      usr.password = this.signupForm.controls['password'].value
      usr.confirmPassword = this.signupForm.controls['confirmPassword'].value;
    
      this.userserv.addUser(usr).subscribe(
        (u) => {
          this.signupForm.reset();
          this.route.navigate(['']);
        }
      );
    }
    
  }
