import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bloc } from 'src/app/models/bloc';
import { BlocService } from 'src/app/services/bloc.service';

@Component({
  selector: 'app-list-bloc',
  templateUrl: './list-bloc.component.html',
  styleUrls: ['./list-bloc.component.css']
})
export class ListBlocComponent implements OnInit{
  blocs: Bloc[] = [];

  constructor(private blocService: BlocService, private route:Router) { }

  ngOnInit() {
    this.blocService.retrieveAllBlocs().subscribe({
      next: (data) => this.blocs = data as Bloc[],
      error: (err) => console.log(err),
    })
    console.log(
      "error "
    );
  }
  deleteBloc(id: number) {
    if (id !== undefined) {
      this.blocService.removeBloc(id).subscribe({
        next: () => {
          this.blocs = this.blocs.filter((c) => c.id !== id);
        },
        error: (err) => console.log(err),
      });
    } else {
      console.error('Invalid bloc id:', id);
    }
  }
  updateBloc(idBloc: number) {
    this.route.navigate(['bloc/updateBloc',idBloc]);
       
      }

      addBloc() {
        this.route.navigate(['bloc/addBloc']);
  
       
      }
}