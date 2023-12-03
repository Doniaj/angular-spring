import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent {
  listusers: User[] = [
   
  ];
constructor(private userserv:UserService,private route:Router){}
ngOnInit() {
  this.userserv.retrieveAllUsers().subscribe({
    next: (data) => this.listusers = data as User[],
    error: (err) => console.log(err),
  })
  console.log(
  )
}
ngOnDestroy() {
  this.listusers = [];
  console.log(this.listusers);
  console.log('I m destroyed');
}
deleteUser(id: number) {

  this.userserv.removeUser(id).subscribe({
    next: () =>
      (this.listusers = this.listusers.filter((u) => u.id != id)),
    error: (err) => console.log(err),
  });
}

updateUser(idUser: number) {
  this.route.navigate(['user/',idUser]);
     
    }

 

  
  


}


