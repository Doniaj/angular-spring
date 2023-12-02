import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChambreComponent } from './chambre.component';
import { ListChambreComponent } from './list-chambre/list-chambre.component';
import { UpdatechambreformComponent } from './updatechambreform/updatechambreform.component';

const routes: Routes = [
  { path: 'addChambre', component: ChambreComponent },
  { path: 'chambres', component: ListChambreComponent },
  { path: 'updateChambre/:id', component: UpdatechambreformComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChambreRoutingModule { }
