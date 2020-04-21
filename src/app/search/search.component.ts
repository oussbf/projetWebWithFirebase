import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../services/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  requestForm: FormGroup;
  filterForm: FormGroup;
  distance = 1;
  showFilter = true;
  changedFilter = [false, false, false, false, false, false, false];
  changedRequest = [false, false, false, false];
  errorMessage: string;

  sitters = [
    {
      firstName : 'Oussama',
      lastName : 'Ben Fredj',
      experience: '5',
      distance: '2',
      location: 'Sousse , Sousse 4004',
      // tslint:disable-next-line:max-line-length
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      rating : '4',
      certificates: ['CPR' , 'Special Needs Care']
    },
    {
      firstName : 'Anis',
      lastName : 'Ben Ghanem',
      experience: '3',
      distance: '5',
      location: 'Tunis , Hay Khadra 1003',
      // tslint:disable-next-line:max-line-length
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      rating : '4',
      certificates: ['CPR' , 'Special Needs Care']
    }
  ];

  /* SORTING VAR AND FUNCTIONS */
  sortedByRating = false;
  sortedByNewest = false;
  sortedByDate = false;
  sortByRating(e) {
    this.sortedByRating = !this.sortedByRating;
    this.sortedByNewest = false;
    this.sortedByDate = false;
    e.target.style.backgroundColor = '#EAEAEA';
    document.getElementById('newestSortBtn').style.backgroundColor = 'white';
    document.getElementById('dateSortBtn').style.backgroundColor = 'white';
  }
  sortByNewest(e) {
    this.sortedByNewest = !this.sortedByNewest;
    this.sortedByRating = false;
    this.sortedByDate = false;
    e.target.style.backgroundColor = '#EAEAEA';
    document.getElementById('ratingSortBtn').style.backgroundColor = 'white';
    document.getElementById('dateSortBtn').style.backgroundColor = 'white';
  }
  sortByDate(e) {
    this.sortedByDate = !this.sortedByDate;
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
    this.showFilter = !this.showFilter;
  }


  constructor(private formBuilder: FormBuilder, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();

  }
  initForm() {
    this.filterForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      duration: ['', [Validators.max(7), Validators.min(0)]],
      openForReg: [''],
      distance: ['', [Validators.max(10), Validators.min(1)]],
      displacement: [''],
      expYears: ['', [Validators.max(70), Validators.min(0)]],
      childAge: [''],
      nbrOfChildren: ['', [Validators.max(5), Validators.min(1)]],
      certif: ['']
    });

    this.requestForm = this.formBuilder.group({
      requestedDate: ['', [Validators.required]],
      requestedDuration: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      requestedLocation: ['', Validators.required],
      requestedChildrenNbr: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      requestedNeedRegularJob: ['', Validators.required]
    });

  }

  onSubmitRequest(formValue) {
    if (this.requestForm.valid) {
      this.searchService.submitRequest(formValue).then(res => {
        window.location.reload();
        this.router.navigate(['profile/parentId']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });

    } else {
      for (let i = 0 ; i < this.changedRequest.length; i++) { this.changedRequest[i] = true; }
    }
  }

  onFilter(formValue) {
    if (this.filterForm.valid) {
      this.searchService.filter(formValue).then(res => {
        window.location.reload();
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });

    } else {
      for (let i = 0 ; i < this.changedFilter.length; i++) { this.changedFilter[i] = true; }
    }
  }
}
