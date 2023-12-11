import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversiteComponent } from './universite.component';
import { ListuniversiteComponent } from './listuniversite/listuniversite.component';
import { UpdateuniversiteformComponent } from './updateuniversiteform/updateuniversiteform.component';


const routes: Routes = [
  { path: 'addUniversite', component: UniversiteComponent },
  { path: 'universites', component: ListuniversiteComponent },
  { path: 'updateUniversite/:id', component: UpdateuniversiteformComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversiteRoutingModule { }
