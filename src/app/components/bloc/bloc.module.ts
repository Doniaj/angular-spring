import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocRoutingModule } from './bloc-routing.module';
import { ListBlocComponent } from './list-bloc/list-bloc.component';
import { UpdateblocformComponent } from './updateblocform/updateblocform.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlocComponent } from './bloc.component';


@NgModule({
  declarations: [  BlocComponent,
    ListBlocComponent,
    UpdateblocformComponent],
  imports: [
    CommonModule,
    BlocRoutingModule, FormsModule,ReactiveFormsModule,HttpClientModule
  ]
})
export class BlocModule { }
