import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Foyer } from 'src/app/models/foyer';

import { FoyerService } from 'src/app/services/foyer.service';

@Component({
  selector: 'app-updatefoyerform',
  templateUrl: './updatefoyerform.component.html',
  styleUrls: ['./updatefoyerform.component.css']
})
export class UpdatefoyerformComponent implements OnInit{
  foyerForm!: FormGroup;
  idFoyer!:number;
  foyer: Foyer = new Foyer();

  constructor(private fb: FormBuilder, private router: Router,private foyerServ:FoyerService,private activeroute:ActivatedRoute) {

    
  }
  ngOnInit(): void {
    this.foyerForm = this.fb.group({
     nomFoyer: ["", [Validators.required]],

     capacite: ["", [Validators.required]]
    });  
    

    this.activeroute.params.subscribe(
      (param)=>{
        this.idFoyer=param['id'];

      }
    )

     this.foyerServ.getfoyerbyid(this.idFoyer).subscribe((f) => {
    console.log(f);
    this.foyerForm.patchValue({
      'nomFoyer': f.nomFoyer,
      'capacite': f.capacite,
      
     
    });
  });
    
  }
  updateFoyer(){
    let f = new Foyer()
    f.nomFoyer = this.foyerForm.controls['nomFoyer'].value
    f.capacite = this.foyerForm.controls['capacite'].value
  

  this.foyerServ.updateFoyer(f,this.idFoyer).subscribe(
    (f)=>{
      this.router.navigate(['foyer/foyers']);
    }
  )
  }

}
