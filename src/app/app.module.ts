import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { FooterComponent } from './features/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import { MatTableModule } from '@angular/material/table';

import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './features/login/login.component';
import { ListusersComponent } from './components/user/listusers/listusers.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListfoyersComponent } from './components/foyer/listfoyers/listfoyers.component';

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
    NgbPaginationModule,

    BrowserModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    MatTableModule,
    ListfoyersComponent,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
