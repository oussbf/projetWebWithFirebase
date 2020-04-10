import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up-a',
  templateUrl: './sign-up-a.component.html',
  styleUrls: ['./sign-up-a.component.scss']
})
export class SignUpAComponent implements OnInit {
 cities = [
    'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes' , 'Gafsa' , 'Jendouba' , 'Kasserine' , 'Kairouan' , 'Kebili' , 'Kef' ,
    'Mahdia' , 'Manouba' , 'Medenine' , 'Monastir' , 'Nabeul' , 'Sfax' , 'Siliana' , 'Sidi Bouzid' , 'Sousse' , 'Tataouine' ,
    'Tozeur' , 'Tunis' , 'Zaghouan' ];
  constructor() { }

  ngOnInit(): void {
  }

}
