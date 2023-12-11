import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Bloc } from 'src/app/models/bloc';
import { BlocService } from 'src/app/services/bloc.service';

@Component({
  selector: 'app-updateblocform',
  templateUrl: './updateblocform.component.html',
  styleUrls: ['./updateblocform.component.css']
})
export class UpdateblocformComponent implements OnInit {
  blocForm!: FormGroup;
  idBloc!:number;
  bloc: Bloc = new Bloc();

  constructor(private fb: FormBuilder, private router: Router,private blocServ:BlocService,private activeroute:ActivatedRoute) {

    
  }
  ngOnInit(): void {
    this.blocForm = this.fb.group({
     nomBloc: ["", [Validators.required]],

     capaciteBloc: ["", [Validators.required]]
    });  
    

    this.activeroute.params.subscribe(
      (param)=>{
        this.idBloc=param['id'];

      }
    )

     this.blocServ.getblocbyid(this.idBloc).subscribe((f) => {
    console.log(f);
    this.blocForm.patchValue({
      'nomBloc': f.nomBloc,
      'capaciteBloc': f.capaciteBloc,
      
     
    });
  });
    
  }
  updateBloc(){
    let b = new Bloc()
    b.nomBloc = this.blocForm.controls['nomBloc'].value
    b.capaciteBloc = this.blocForm.controls['capaciteBloc'].value
  

  this.blocServ.updateBloc(b,this.idBloc).subscribe(
    (f)=>{
      this.router.navigate(['bloc/blocs']);
    }
  )
  }
}
