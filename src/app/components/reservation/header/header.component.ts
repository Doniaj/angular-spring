import { Reservation } from '../../../models/Reservation';
import { Component , OnInit, Inject} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormsModule } from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { SerachResultComponent } from '../serach-result/serach-result.component';
import { FormBuilder, Validators } from '@angular/forms';


interface Uni {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})


export class HeaderComponent implements OnInit{
/*   faEnvelope = faEnvelopeOpen;
  faPhone = faPhone; */
  reservationForm !:FormGroup;

  constructor(public dialog: MatDialog , private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.reservationForm = this.formBuilder.group({
      typec: ['', Validators.required],
      nomUniversite: ['', Validators.required],
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(SerachResultComponent,{
      data:{
        TypeC:"qwerty"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  unis: Uni[] = [
    {value: 'esprit-0', viewValue: 'ESPRIT'},
    {value: 'msb-1', viewValue: ' MSB'},
    {value: 'sesame-2', viewValue: 'SESAME'},
    {value: 'iset-3', viewValue: 'ISET'},
    {value: 'tekup-4', viewValue: 'TEK-UP'},

  ];
  
  
  test(){
    console.log(this.reservationForm.value);
  }

}




