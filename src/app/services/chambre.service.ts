import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Chambre } from '.././models/chambre';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  apiUrl = environment.baseUrl ;

  constructor(private http: HttpClient) { }

 
  
  retrieveAllChambres():Observable<Chambre[]>{
    return this.http.get<Chambre[]>(this.apiUrl+ "/retrieveAllChambres" );
  }
  addChambre(body: Chambre):Observable<Chambre> {
    return this.http.post<Chambre>(this.apiUrl+"/addChambre", body);
  }

  updateChambre(body: Chambre,idChambre:number):Observable<Chambre>  {
    return this.http.put<Chambre>(this.apiUrl+"/updateChambre/"+idChambre, body);
  }

  removeChambre(idChambre: number):Observable<Chambre>  {
    return this.http.delete<Chambre>(this.apiUrl +"/removeChambre/"+ idChambre);
  }
  retrieveChambre(idChambre:number):Observable<Chambre> {
    return this.http.get<Chambre>(this.apiUrl+"/retrieveChambre/"+idChambre);
  }
  searchUniversitiesByLetter(letter: string) {
    const url = `this.apiUrl?letter=${letter}`;
    return this.http.get<Chambre[]>(url);
  }

}
