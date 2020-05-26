import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {AngularFireDatabase} from '@angular/fire/database';
import {SitterModalService} from '../services/sitterModal.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParentAccountService} from '../services/parent-account.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  distance = 1;
  showFilter = true;
  requestForm: FormGroup;
  sitters: any [] = [] ;
  changedRequest = [false, false, false, false];
  filteredSitters: any ;
  filters = {};
  sortOrder = 'asc';
  sortColumn = 'firstName';
  availabilityDate: number;
  endDate: number;
  availabilityDuration: number;
  availablityOpenForRegularJob: boolean;
  displacement: boolean;
  experienceYears: number;
  toddler: boolean;
  infant: boolean;
  preschooler: boolean;
  schooler: boolean;
  numberOfChildrenHandling: number;
  CPR: boolean;
  firstAid: boolean;
  waterSafety: boolean;
  drivingLicence: boolean;
  nutrition: boolean;
  fitnessEducation: boolean;
  specialNeedCare: boolean;


  /* SORTING VAR AND FUNCTIONS */
  sortedByRating = false;
  sortedByExperience = false;
  sortedByDate = false;
  sortByRating(e) {
    this.sortedByRating = !this.sortedByRating;
    this.sortedByExperience = false;
    this.sortedByDate = false;
    e.target.style.backgroundColor = '#EAEAEA';
    document.getElementById('ExperienceSortBtn').style.backgroundColor = 'white';
    document.getElementById('dateSortBtn').style.backgroundColor = 'white';
    this.sortColumn = 'avgRate';
    this.sortOrder = (!this.sortedByRating) ? 'asc' : 'desc';
  }
  sortByExperience(e) {
    this.sortedByExperience = !this.sortedByExperience;
    this.sortedByRating = false;
    this.sortedByDate = false;
    e.target.style.backgroundColor = '#EAEAEA';
    document.getElementById('ratingSortBtn').style.backgroundColor = 'white';
    document.getElementById('dateSortBtn').style.backgroundColor = 'white';
    this.sortColumn = 'experienceYears';
    this.sortOrder = (!this.sortedByExperience) ? 'asc' : 'desc';
  }
  sortByDate(e) {
    this.sortedByDate = !this.sortedByDate;
    this.sortedByExperience = false;
    this.sortedByRating = false;
    e.target.style.backgroundColor = '#EAEAEA';
    document.getElementById('ExperienceSortBtn').style.backgroundColor = 'white';
    document.getElementById('ratingSortBtn').style.backgroundColor = 'white';
    this.sortColumn = 'availabilityDate';
    this.sortOrder = (!this.sortedByDate) ? 'asc' : 'desc';
  }

  distanceChange(event) {
    this.distance = event.target.value;
  }
  changeFilter() {
    this.showFilter = !this.showFilter;
  }

  initForm() {
    this.requestForm = this.formBuilder.group({
      requestedDate: ['', [Validators.required]],
      requestedDuration: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      requestedLocation: ['', Validators.required],
      requestedChildrenNbr: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      requestedNeedRegularJob: ['', Validators.required]
    });
  }

  onSubmitRequest(formValue, sitterId) {
    if (this.requestForm.valid) {
      this.parentAccountService.requestJob(formValue, sitterId);
    } else {
      for (let i = 0 ; i < this.changedRequest.length; i++) { this.changedRequest[i] = true; }
    }
  }


  constructor(private searchService: SearchService, private router: Router,
              private db: AngularFireDatabase, private formBuilder: FormBuilder,
              private parentAccountService: ParentAccountService) { }

  ngOnInit(): void {
    this.initForm();
    this.db.list('/sitters').snapshotChanges().subscribe( sitters => {
      sitters.forEach(sitter => {
        const x = sitter.payload.exportVal();
        const sitt: SitterModalService = new SitterModalService(x.firstName, x.lastName, '', ''
        , '', x.city, '', x.age, x.numberOfChildrenHandling, [], x.displacement.toString() , x.experienceYears
        , [], x.aboutMe, {}, x.gender, x.availability.toString(), x.availabilityDate, x.availabilityDuration,
          '', [], x.avgRate, 0, x.availablityOpenForRegularJob.toString(), []);
        sitter.payload.child('certificates').forEach(certif => {
          if (certif.exportVal()) {sitt.certificates.push(certif.key); }
        });
        sitter.payload.child('childAge').forEach(childAge => {
          if (childAge.exportVal()) {sitt.childAge.push(childAge.key); }
        });
        sitt.id = sitter.key;
        this.sitters.push(sitt);
      });
      this.applyFilter();
    });
  }

  applyFilterCertificate(property: string, certifName: string, rule) {
    if (!rule) {
      this.removeFilter(property);
    } else {
      this.filters[property] = val => val.indexOf(certifName) !== -1;
    }
    this.applyFilter();
  }

  applyFilterChildAge(property: string, childAge: string, rule) {
    if (!rule) {
      this.removeFilter(property);
    } else {
      this.filters[property] = val => val.indexOf(childAge) !== -1;
    }
    this.applyFilter();
  }

  private applyFilter() {
    this.filteredSitters = _.filter(this.sitters, _.conforms(this.filters));

  }

  filterExact(property: string, rule: any) {
    this.filters[property] = val => val === rule;
    this.applyFilter();
  }

  filterGreaterThan(property: string, rule: any) {
    this.filters[property] = val => val >= rule;
    this.applyFilter();
  }

  filterMinorThan(property: string, rule: any) {
    this.filters[property] = val => val <= rule;
    this.applyFilter();
  }

  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilter();
  }



}
