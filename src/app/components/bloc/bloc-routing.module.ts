import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocComponent } from './bloc.component';
import { ListBlocComponent } from './list-bloc/list-bloc.component';
import { UpdateblocformComponent } from './updateblocform/updateblocform.component';

const routes: Routes = [
  { path: 'addBloc', component: BlocComponent },
  { path: 'blocs', component: ListBlocComponent },
  { path: 'updateBloc/:id', component: UpdateblocformComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocRoutingModule { }
