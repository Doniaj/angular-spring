import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoyerComponent } from './foyer.component';

import { UpdatefoyerformComponent } from './updatefoyerform/updatefoyerform.component';
import { ListfoyersComponent } from './listfoyers/listfoyers.component';

const routes: Routes = [
  { path: 'addFoyer', component: FoyerComponent },
  { path: 'foyers', component: ListfoyersComponent },
  { path: 'updateFoyer/:id', component: UpdatefoyerformComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoyerRoutingModule { }
