import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Bloc } from '../models/bloc';

@Injectable({
  providedIn: 'root'
})
export class BlocService {

  apiUrl = environment.baseUrl + "blocs/";
 

  constructor(private http: HttpClient) { }

 

  retrieveAllBlocs() {
    return this.http.get(this.apiUrl);
  }
  addBloc(body: Bloc) {
    return this.http.post(this.apiUrl, body);
  }

  updateBloc(body: Bloc,idBloc:number) {
    return this.http.put(this.apiUrl+idBloc, body);
  }

  removeBloc(idBloc: number) {
    return this.http.delete(this.apiUrl + idBloc);
  }
  getblocbyid(idBloc:number){
    return this.http.get<Bloc>(this.apiUrl+idBloc);
  }
}
