import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Foyer } from '../models/foyer';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {

  apiUrl = environment.baseUrl + "foyers/";

  constructor(private http: HttpClient) { }

 

  retrieveAllfoyers() {
    return this.http.get(this.apiUrl);
  }
  addFoyer(body: Foyer) {
    return this.http.post(this.apiUrl, body);
  }

  updateFoyer(body: Foyer,idFoyer:number) {
    return this.http.put(this.apiUrl+idFoyer, body);
  }

  removeFoyer(idFoyer: number) {
    return this.http.delete(this.apiUrl + idFoyer);
  }
  getfoyerbyid(idFoyer:number){
    return this.http.get<Foyer>(this.apiUrl + idFoyer);
  }
}