import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SitterRatingService} from '../../services/sitter-rating.service';

@Component({
  selector: 'app-sitter',
  templateUrl: './sitter.component.html',
  styleUrls: ['./sitter.component.scss']
})
export class SitterComponent implements OnInit {
  reviewForm: FormGroup;
  changedReview = false;
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
  starRating = 1;
  constructor(private formBuilder: FormBuilder, private sitterRatingService: SitterRatingService) { }

  star1Click() {
    this.starRating = 1;
    this.star1 = true;
    this.star2 = false;
    this.star3 = false;
    this.star4 = false;
    this.star5 = false;
  }
  star2Click() {
    this.starRating = 2;
    this.star1 = true;
    this.star2 = true;
    this.star3 = false;
    this.star4 = false;
    this.star5 = false;
  }
  star3Click() {
    this.starRating = 3;
    this.star1 = true;
    this.star2 = true;
    this.star3 = true;
    this.star4 = false;
    this.star5 = false;
  }
  star4Click() {
    this.starRating = 4;
    this.star1 = true;
    this.star2 = true;
    this.star3 = true;
    this.star4 = true;
    this.star5 = false;
  }
  star5Click() {
    this.starRating = 5;
    this.star1 = true;
    this.star2 = true;
    this.star3 = true;
    this.star4 = true;
    this.star5 = true;
  }

  addToFavourites() {
    this.addedToFavourites = !this.addedToFavourites;
  }

  ngOnInit(): void {
    this.initForm();

  }
  initForm() {
    this.reviewForm = this.formBuilder.group({
      reviewText: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }
  onSubmitReview(formValue) {
    if (this.reviewForm.valid) {
      this.sitterRatingService.SubmitReview(formValue, this.starRating).then(res => {
        window.location.reload();
      }, err => console.log(err));
    } else {
      this.changedReview = true;
    }
  }

}
