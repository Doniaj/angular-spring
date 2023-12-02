import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { UserComponent } from './components/user/user.component';
import { ListusersComponent } from './components/user/listusers/listusers.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: UserComponent },
  { path: 'users', component: ListusersComponent },
  {
    path: 'chambre',
    loadChildren: () =>
      import('./components/chambre/chambre.module').then((m) => m.ChambreModule),
  },
  {
    path: 'universite',
    loadChildren: () =>
      import('./components/universite/universite.module').then((m) => m.UniversiteModule),
  }, {
    path: 'foyer',
    loadChildren: () =>
      import('./components/foyer/foyer.module').then((m) => m.FoyerModule),
  },
  {
    path: 'bloc',
    loadChildren: () =>
      import('./components/bloc/bloc.module').then((m) => m.BlocModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
