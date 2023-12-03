import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoyerRoutingModule } from './foyer-routing.module';
import { FoyerComponent } from './foyer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatefoyerformComponent } from './updatefoyerform/updatefoyerform.component';
import { ListfoyersComponent } from './listfoyers/listfoyers.component';


@NgModule({
  declarations: [
    FoyerComponent,UpdatefoyerformComponent

  ],
  imports: [
    ListfoyersComponent,
    CommonModule,
    FoyerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FoyerModule { }
