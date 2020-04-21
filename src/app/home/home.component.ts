import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  step1Image = 'assets/img/step1-grey.png';
  step2Image = 'assets/img/step2-grey.png';
  step3Image = 'assets/img/step3-grey.png';

  constructor() { }

  ngOnInit(): void {
  }

}
