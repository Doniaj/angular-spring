import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation.component';
import { HeaderComponent } from './header/header.component';
import { SerachResultComponent } from './serach-result/serach-result.component';

const routes: Routes = [
  {
    path: '',
    component: ReservationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
