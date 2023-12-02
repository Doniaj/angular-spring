import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ChambreRoutingModule } from './chambre-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChambreComponent } from './chambre.component';
import { ListChambreComponent } from './list-chambre/list-chambre.component';
import { UpdatechambreformComponent } from './updatechambreform/updatechambreform.component';


@NgModule({
  declarations: [ ChambreComponent,ListChambreComponent,UpdatechambreformComponent],
  imports: [
    CommonModule,
    ChambreRoutingModule, FormsModule,ReactiveFormsModule,HttpClientModule
  ]
})
export class ChambreModule { }
