import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { FooterComponent } from './features/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';

import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './features/login/login.component';
import { ListusersComponent } from './components/user/listusers/listusers.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    ListusersComponent,
    SidebarComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
