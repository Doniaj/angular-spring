import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chambre } from 'src/app/models/chambre';
import { ChambreService } from 'src/app/services/chambre.service';

@Component({
  selector: 'app-updatechambreform',
  templateUrl: './updatechambreform.component.html',
  styleUrls: ['./updatechambreform.component.css']
})
export class UpdatechambreformComponent implements OnInit {
  chambreForm!: FormGroup;
  idChambre!:number;
  chambre: Chambre = new Chambre();

  constructor(private fb: FormBuilder, private router: Router,private chambreServ:ChambreService,private activeroute:ActivatedRoute) {

    
  }
  ngOnInit(): void {
    this.chambreForm = this.fb.group({
      numeroChambre: ["", [Validators.required, Validators.minLength(3)]],

      typeC: ["", [Validators.required]]
    });  
    

    this.activeroute.params.subscribe(
      (param)=>{
        this.idChambre=param['id'];

      }
    )

     this.chambreServ.getchambrebyid(this.idChambre).subscribe((c) => {
    console.log(c);
    this.chambreForm.patchValue({
      'numeroChambre': c.numeroChambre,
      'typeC': c.typeC,
      
     
    });
  });
    
  }
  updateChambre(){
    let c = new Chambre()
    c.numeroChambre = this.chambreForm.controls['numeroChambre'].value
    c.typeC = this.chambreForm.controls['typeC'].value
  

  this.chambreServ.updateChambre(c,this.idChambre).subscribe(
    (u)=>{
      this.router.navigate(['chambre/chambres']);
    }
  )
  }



}