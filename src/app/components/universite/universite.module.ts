import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversiteRoutingModule } from './universite-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChambreRoutingModule } from '../chambre/chambre-routing.module';
import { UniversiteComponent } from './universite.component';
import { ListuniversiteComponent } from './listuniversite/listuniversite.component';
import { UpdateuniversiteformComponent } from './updateuniversiteform/updateuniversiteform.component';


@NgModule({
  declarations: [UniversiteComponent ,ListuniversiteComponent,UpdateuniversiteformComponent
  ],
  imports: [
    UniversiteRoutingModule,CommonModule,
    ChambreRoutingModule, FormsModule,ReactiveFormsModule,HttpClientModule,
  ]
})
export class UniversiteModule { }
