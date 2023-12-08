import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Foyer } from '../models/foyer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {

  apiUrl = environment.baseUrl ;

  constructor(private http: HttpClient) { }

 

  retrieveAllfoyers():Observable<Foyer[]> {
    return this.http.get<Foyer[]>(this.apiUrl+'/foyers');
  }
  addFoyer(body: Foyer) :Observable<Foyer> {
    return this.http.post<Foyer>(this.apiUrl+'/addFoyer', body);
  }

  updateFoyer(idFoyer:number,body: Foyer):Observable<Foyer> {
    return this.http.put<Foyer>(this.apiUrl+'/updateFoyer/'+idFoyer, body);
  }

  removeFoyer(idFoyer: number):Observable<Foyer>  {
    return this.http.delete<Foyer>(this.apiUrl + '/removeFoyer/'+idFoyer);
  }
  retrieveFoyer(idFoyer:number):Observable<Foyer>{
    return this.http.get<Foyer>(this.apiUrl + '/get/'+idFoyer);
  }
}