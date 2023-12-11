import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Chambre } from 'src/app/models/chambre';
import { Universite } from 'src/app/models/universite';
import { ChambreService } from 'src/app/services/chambre.service';
import { UniversiteService } from 'src/app/services/universite.service';

@Component({
  selector: 'app-updateuniversiteform',
  templateUrl: './updateuniversiteform.component.html',
  styleUrls: ['./updateuniversiteform.component.css']
})
export class UpdateuniversiteformComponent implements OnInit{
  universiteForm!: FormGroup;
  idUniversite!:number;
  universite: Universite = new Universite();

  constructor(private fb: FormBuilder, private router: Router,private universiteServ:UniversiteService,private activeroute:ActivatedRoute) {

    
  }
  ngOnInit(): void {
    this.universiteForm = this.fb.group({
      nomUniversite: ["", [Validators.required]],

      adresse: ["", [Validators.required]],
      image:[""]
    });  
    

    this.activeroute.params.subscribe(
      (param)=>{
        this.idUniversite=param['id'];

      }
    )

     this.universiteServ.getuniversitebyid(this.idUniversite).subscribe((u) => {
    console.log(u);
    this.universiteForm.patchValue({
      'nomUniversite': u.nomUniversite,
      'adresse': u.adresse,
      'image': u.image,
      
     
    });
  });
    
  }
  updateUniversite(){
    let u = new Universite()
    u.nomUniversite = this.universiteForm.controls['nomUniversite'].value
   u.adresse = this.universiteForm.controls['adresse'].value
   u.image = this.universiteForm.controls['image'].value
  

  this.universiteServ.updateUniversite(u,this.idUniversite).subscribe(
    (u)=>{
      this.router.navigate(['universite/universites']);
    }
  )
  }

}
