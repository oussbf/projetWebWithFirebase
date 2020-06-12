import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SitterRatingService} from '../../services/sitter-rating.service';
import {ActivatedRoute} from '@angular/router';
import {SitterModalService} from '../../services/sitterModal.service';
import * as firebase from 'firebase';
import {AuthService} from '../../services/auth.service';
import {ParentAccountService} from '../../services/parent-account.service';
import {now} from 'moment';


@Component({
  selector: 'app-sitter',
  templateUrl: './sitter.component.html',
  styleUrls: ['./sitter.component.scss']
})
export class SitterComponent implements OnInit {
  reviewForm: FormGroup;
  requestForm: FormGroup;
  changedReview = false;
  addedToFavourites = false;
  sitterProfile: SitterModalService;
  sitterId: string;
  profileImage = 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
  star1 = true;
  star2 = false;
  star3 = false;
  star4 = false;
  star5 = false;
  starRating = 1;
  changedRequest = [false, false, false, false];
  visibilityRatingForm = false;
  pageReady = false;
  constructor(private formBuilder: FormBuilder, private sitterRatingService: SitterRatingService, private route: ActivatedRoute,
              public authService: AuthService, private parentAccountService: ParentAccountService) { }

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


  ngOnInit(): void {
    this.initForm();
    this.sitterId = this.route.snapshot.params.id;
    this.sitterProfile = new SitterModalService('', '', '', '', '',
      '', '', '', '' , [],
      '', '', [], '', '', '', '',
      '', '' , '' , [],
      '', [0, 0, 0, 0, 0], '', []);
    firebase.database().ref().child(`sitters/${this.sitterId}`).once('value' , (res) => {
      this.sitterProfile.firstName = res.exportVal().firstName;
      this.sitterProfile.lastName = res.exportVal().lastName;
      this.sitterProfile.gender = res.exportVal().gender;
      this.sitterProfile.city = res.exportVal().city;
      this.sitterProfile.experienceYears = res.exportVal().experienceYears;
      this.sitterProfile.displacement = res.exportVal().displacement;
      this.sitterProfile.age = res.exportVal().age;
      this.sitterProfile.jobEducation = res.exportVal().jobEducation;
      this.sitterProfile.aboutMe = res.exportVal().aboutMe;
      this.sitterProfile.imageUrl = res.exportVal().imageURL;
      if (this.sitterProfile.imageUrl) {
        this.profileImage = this.sitterProfile.imageUrl;
      }
      res.child('certificates').forEach(x => {if (x.exportVal()) {this.sitterProfile.certificates.push(x.key.toString()); } });
      res.child('childAge').forEach(x => {if (x.exportVal()) {this.sitterProfile.childAge.push(x.key.toString()); } });
      this.sitterProfile.availability = res.exportVal().availability;
      this.sitterProfile.availabilityDate = res.exportVal().availabilityDate;
      this.sitterProfile.availabilityDuration = res.exportVal().availabilityDuration;
      this.sitterProfile.availabilityAdditionalInfo = res.exportVal().availabilityAdditionalInfo;
      res.child('reviews').forEach(x => {
        const reviewerInfo = {
          idRev: x.exportVal().idRev,
          firstNameRev: x.exportVal().firstNameRev,
          reviewDate: x.exportVal().reviewDate,
          review: x.exportVal().review,
          reviewText: x.exportVal().reviewText,
          imageURL: x.exportVal().imageURL
        };
        this.sitterProfile.starCounts[+x.exportVal().review - 1]++;
        this.sitterProfile.reviews.push(reviewerInfo);
      });
      this.sitterProfile.avgRate = res.exportVal().avgRate;
    } ).then(() => this.pageReady = true);

    firebase.database().ref(`parents/${this.authService.userId}/favourites`).orderByChild('idFavourite').equalTo(this.sitterId)
      .once('value', child => {
        this.addedToFavourites = child.hasChildren();
      });

    firebase.database().ref(`sitters/${this.sitterId}/reviews`).orderByChild('idRev').equalTo(this.authService.userId)
      .once('value', child => {
        this.visibilityRatingForm = (this.authService.isParent && !child.hasChildren());
      });
  }


  initForm() {
    this.reviewForm = this.formBuilder.group({
      reviewText: ['', [Validators.required, Validators.maxLength(500)]]
    });

    this.requestForm = this.formBuilder.group({
      requestedDate: ['', [Validators.required]],
      requestedDuration: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      requestedLocation: ['', Validators.required],
      requestedChildrenNbr: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      requestedNeedRegularJob: ['', Validators.required]
    });
  }
  onSubmitReview(formValue) {
    if (this.reviewForm.valid) {
      this.sitterRatingService.SubmitReview(formValue, this.starRating, this.sitterId);
    } else {
      this.changedReview = true;
    }
  }

  onSubmitRequest(formValue) {
    if (this.requestForm.valid) {
      this.parentAccountService.requestJob(formValue, this.sitterId);
    } else {
      for (let i = 0 ; i < this.changedRequest.length; i++) { this.changedRequest[i] = true; }
    }
  }

  addToFavourites() {
    this.addedToFavourites = !this.addedToFavourites;
    if (this.addedToFavourites) {
      this.parentAccountService.addToFavourites(this.sitterId);
    } else {
      this.parentAccountService.deleteFavourite(this.sitterId);
    }
  }

}
