import { Injectable } from '@angular/core';
import { Universite } from '../models/universite';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Foyer } from '../models/foyer';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  retreiveAllUniversities():Observable<Universite[]> {
    return this.http.get<Universite[]>(this.apiUrl+'/universites');
  }
  addUniversite(body: Universite): Observable<Universite> {
    return this.http.post<Universite>(this.apiUrl+'/addUniversite', body);
  }

  updateUniversite(body: Universite,idUniversite:number):Observable<Universite> {
    return this.http.put<Universite>(this.apiUrl+'/updateUniversite/'+ body,idUniversite);
  }

  removeUniversite(idUniversite: number):Observable<Universite> {
    return this.http.delete<Universite>(this.apiUrl +'/removeUniversite/'+ idUniversite);
  }

  retrieveUniversite(idUniversite:number):Observable<Universite>{
    return this.http.get<Universite>(this.apiUrl +'/retrieveUniversite/'+ idUniversite);
  }
  searchUniversitiesByLetter(letter: string) {
    const url = `this.apiUrl?letter=${letter}`;
    return this.http.get<Universite[]>(url);
  }
 

  desaffecterUniversiteDeFoyer(idFoyer: number, idUniversite: number): Observable<any> {
    const url = `${this.apiUrl}/desaffecter-universite-de-foyer/${idFoyer}/${idUniversite}`;
    return this.http.post(url, null); // 
  }
  getFoyerById(id: number): Observable<Foyer> {
    const foyerUrl = `http://votre-api.com/foyers/${id}`;
    return this.http.get<Foyer>(foyerUrl);
  } getUniversities(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.apiUrl}/universites`);
  }

  getFoyers(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.apiUrl}/foyers`);
  }

  affecterFoyerAUniversite(idFoyer: number, nomUniversite: string): Observable<any> {
    const url = `${this.apiUrl}/affecterFoyer/${idFoyer}/${nomUniversite}`;
    
    const body = {
      idFoyer: idFoyer,
      nomUniversite: nomUniversite
    };
  
    return this.http.post(url, body);
  }
  

}
