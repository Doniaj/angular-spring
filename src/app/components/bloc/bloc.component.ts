import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlocService } from 'src/app/services/bloc.service';

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.css']
})
export class BlocComponent implements OnInit{
  blocForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private blocServ: BlocService) {}

  ngOnInit(): void {
    this.blocForm = this.fb.group({
      capaciteBloc: ["", [Validators.required]],
      nomBloc: ["", [Validators.required, Validators.pattern('[A-Za-z]*')]]

    });
  }

  addBloc() {
    if (this.blocForm.valid) {
      // Assign the form values to the user object
      this.blocServ.addBloc(this.blocForm.getRawValue()).subscribe(() =>
        this.router.navigate(['bloc/blocs'])
      );
    } else {
      // Handle invalid form data
    }
  }

  get capaciteBloc() {
    return this.blocForm.get('capaciteBloc')!;
  }

  get nomBloc() {
    return this.blocForm.get('nomBloc');
  }

}