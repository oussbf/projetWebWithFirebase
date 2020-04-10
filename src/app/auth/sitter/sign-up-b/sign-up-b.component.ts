import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up-b',
  templateUrl: './sign-up-b.component.html',
  styleUrls: ['./sign-up-b.component.scss']
})
export class SignUpBComponent implements OnInit {
  cities = [
    'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes' , 'Gafsa' , 'Jendouba' , 'Kasserine' , 'Kairouan' , 'Kebili' , 'Kef' ,
    'Mahdia' , 'Manouba' , 'Medenine' , 'Monastir' , 'Nabeul' , 'Sfax' , 'Siliana' , 'Sidi Bouzid' , 'Sousse' , 'Tataouine' ,
    'Tozeur' , 'Tunis' , 'Zaghouan' ];
  startDate = new Date(1990, 0, 1);

  constructor() { }

  ngOnInit(): void {
  }

}
