import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.baseUrl + "users/";

  constructor(private http: HttpClient) { }
  retrieveAllUsers() {
    return this.http.get(this.apiUrl);
  }
  addUser(body: User) {
    return this.http.post(this.apiUrl, body);
  }

  updateUser(body: User,idChambre:number) {
    return this.http.put(this.apiUrl+idChambre, body);
  }

  removeUser(idChambre: number) {
    return this.http.delete(this.apiUrl + idChambre);
  }
  getuserbyid(idChambre:number){
    return this.http.get<User>(this.apiUrl+idChambre);
  }

}
