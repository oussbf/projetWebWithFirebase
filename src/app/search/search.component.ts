import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  distance = 1;
  filter = true;
  sitters = [
    {
      firstName : 'Oussama',
      lastName : 'Ben Fredj',
      experience: '5',
      distance: '2',
      location: 'Sousse , Sousse 4004',
      // tslint:disable-next-line:max-line-length
      describtion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      rating : '4',
      certificates: ['CPR' , 'Special Needs Care']
    },
    {
      firstName : 'anis',
      lastName : 'Ben Ghanem',
      experience: '3',
      distance: '5',
      location: 'Tunis , Hay Khadra 1003',
      // tslint:disable-next-line:max-line-length
      describtion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      rating : '4',
      certificates: ['CPR' , 'Special Needs Care']
    }
  ];

  /* SORTING VAR AND FUNCTIONS */
  sortedByRating = false;
  sortedByNewest = false;
  sortedByPrice = false;
  sortByRating(e) {
    this.sortedByRating = !this.sortedByRating;
    this.sortedByNewest = false;
    this.sortedByPrice = false;
    e.target.style.backgroundColor = '#EAEAEA';
    document.getElementById('newestSortBtn').style.backgroundColor = 'white';
    document.getElementById('priceSortBtn').style.backgroundColor = 'white';
  }
  sortByNewest(e) {
    this.sortedByNewest = !this.sortedByNewest;
    this.sortedByRating = false;
    this.sortedByPrice = false;
    e.target.style.backgroundColor = '#EAEAEA';
    document.getElementById('ratingSortBtn').style.backgroundColor = 'white';
    document.getElementById('priceSortBtn').style.backgroundColor = 'white';
  }
  sortByPrice(e) {
    this.sortedByPrice = !this.sortedByPrice;
    this.sortedByNewest = false;
    this.sortedByRating = false;
    e.target.style.backgroundColor = '#EAEAEA';
    document.getElementById('newestSortBtn').style.backgroundColor = 'white';
    document.getElementById('ratingSortBtn').style.backgroundColor = 'white';
  }
  /* END SORTING VAR AND FUNCTIONS */
  distanceChange(event) {
    this.distance = event.target.value;
  }
  changeFilter() {
    this.filter = !this.filter;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
