import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sitter',
  templateUrl: './sitter.component.html',
  styleUrls: ['./sitter.component.scss']
})
export class SitterComponent implements OnInit {
  addedToFavourites = false;
  ratings = [
    {},
    {}
  ];
  star1 = true;
  star2 = false;
  star3 = false;
  star4 = false;
  star5 = false;
  constructor() { }

  star1Click() {
    this.star1 = true;
    this.star2 = false;
    this.star3 = false;
    this.star4 = false;
    this.star5 = false;
  }
  star2Click() {
    this.star1 = true;
    this.star2 = true;
    this.star3 = false;
    this.star4 = false;
    this.star5 = false;
  }
  star3Click() {
    this.star1 = true;
    this.star2 = true;
    this.star3 = true;
    this.star4 = false;
    this.star5 = false;
  }
  star4Click() {
    this.star1 = true;
    this.star2 = true;
    this.star3 = true;
    this.star4 = true;
    this.star5 = false;
  }
  star5Click() {
    this.star1 = true;
    this.star2 = true;
    this.star3 = true;
    this.star4 = true;
    this.star5 = true;
  }
  ngOnInit(): void {
  }
  addToFavourites() {
    this.addedToFavourites = !this.addedToFavourites;
  }

}
