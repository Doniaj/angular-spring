import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Chambre } from '.././models/chambre';


@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  apiUrl = environment.baseUrl + "chambres/";

  constructor(private http: HttpClient) { }

 

  retrieveAllChambres() {
    return this.http.get(this.apiUrl);
  }
  addChambre(body: Chambre) {
    return this.http.post(this.apiUrl, body);
  }

  updateChambre(body: Chambre,idChambre:number) {
    return this.http.put(this.apiUrl+idChambre, body);
  }

  removeChambre(idChambre: number) {
    return this.http.delete(this.apiUrl + idChambre);
  }
  getchambrebyid(idChambre:number){
    return this.http.get<Chambre>(this.apiUrl+idChambre);
  }


}
