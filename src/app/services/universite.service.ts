import { Injectable } from '@angular/core';
import { Universite } from '../models/universite';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  apiUrl = environment.baseUrl + "universites/";

  constructor(private http: HttpClient) { }

 

  retreiveAllUniversites() {
    return this.http.get(this.apiUrl);
  }
  addUniversite(body: Universite) {
    return this.http.post(this.apiUrl, body);
  }

  updateUniversite(body: Universite,idUniversite:number) {
    return this.http.put(this.apiUrl+idUniversite, body);
  }

  removeUniversite(idUniversite: number) {
    return this.http.delete(this.apiUrl + idUniversite);
  }

  getuniversitebyid(idUniversite:number){
    return this.http.get<Universite>(this.apiUrl + idUniversite);
  }
  searchUniversitiesByLetter(letter: string) {
    const url = `this.apiUrl?letter=${letter}`;
    return this.http.get<Universite[]>(url);
  }

}
