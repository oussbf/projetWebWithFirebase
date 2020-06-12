import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SitterAccountService} from '../../services/sitter-account.service';
import {SitterModalService} from '../../services/sitterModal.service';
import * as firebase from 'firebase';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sitterid',
  templateUrl: './sitterid.component.html',
  styleUrls: ['./sitterid.component.scss']
})
export class SitteridComponent implements OnInit {
  personalInfoForm: FormGroup;
  newPasswordForm: FormGroup;
  availabilityForm: FormGroup;
  jobInformationForm: FormGroup;
  aboutMeForm: FormGroup;
  notificationForm: FormGroup;
  sitterProfile: SitterModalService;
  savingPI = false;
  savingNP = false;
  savingJI = false;
  savingAM = false;
  savingAvailability = false;
  url: string | ArrayBuffer = 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
  available = false;
  newsLetterChecked = false;
  checkBoxChecked = false;
  changedPI  = [false, false, false , false, false];
  changedNP = [false, false, false];
  changedJI = [false, false, false];
  changedAM = false;
  changedAV = [false, false, false, false];
  changedNotif = false;


  constructor(private formBuilder: FormBuilder , private sitterAccountService: SitterAccountService, private authService: AuthService) {
    this.initForms();
    this.sitterProfile = new SitterModalService('', '', '', '', '',
      '', '', '', '' , [],
      '', '', [], '', {}, '', '',
      '', '' , '' , [],
      '', [0, 0, 0, 0, 0], '', []);
    firebase.database().ref().child(`sitters/${this.authService.userId}`).once('value', (sitter) => {
      this.sitterProfile.firstName = sitter.exportVal().firstName;
      this.sitterProfile.lastName = sitter.exportVal().lastName;
      this.sitterProfile.email = sitter.exportVal().email;
      this.sitterProfile.phoneNumber = sitter.exportVal().phoneNumber;
      this.sitterProfile.jobEducation = sitter.exportVal().jobEducation;
      this.sitterProfile.gender = sitter.exportVal().gender;
      this.sitterProfile.city = sitter.exportVal().city;
      this.sitterProfile.experienceYears = sitter.exportVal().experienceYears;
      this.sitterProfile.displacement = sitter.exportVal().displacement;
      this.sitterProfile.numberOfChildrenHandling = sitter.exportVal().numberOfChildrenHandling;
      this.sitterProfile.age = sitter.exportVal().age;
      this.sitterProfile.aboutMe = sitter.exportVal().aboutMe;
      sitter.child('certificates').forEach(x => {if (x.exportVal()) {this.sitterProfile.certificates.push(x.key.toString()); } });
      sitter.child('childAge').forEach(x => {if (x.exportVal()) {this.sitterProfile.childAge.push(x.key.toString()); } });
      this.sitterProfile.availability = sitter.exportVal().availability;
      this.available = sitter.exportVal().availability;
      this.sitterProfile.availabilityDate = sitter.exportVal().availabilityDate;
      this.sitterProfile.availabilityDuration = sitter.exportVal().availabilityDuration;
      this.sitterProfile.availabilityAdditionalInfo = sitter.exportVal().availabilityAdditionalInfo;
      this.sitterProfile.availablityOpenForRegularJob = sitter.exportVal().availablityOpenForRegularJob;
      this.sitterProfile.imageUrl = sitter.exportVal().imageURL;
      if (this.sitterProfile.imageUrl) {
        this.url = this.sitterProfile.imageUrl;
      }

      sitter.child('reviews').forEach(x => {
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
      this.sitterProfile.avgRate = sitter.exportVal().avgRate;
      this.sitterProfile.notifications.emailSub = sitter.exportVal().notifications.emailSub;
      this.sitterProfile.notifications.jobRequest = sitter.exportVal().notifications.jobRequest;
      this.sitterProfile.notifications.reviewsReceived = sitter.exportVal().notifications.reviewsReceived;
      if (this.sitterProfile.notifications.emailSub.length > 0) {
        this.newsLetterChecked = true;
        document.querySelector('#subscribeEmail').setAttribute('disabled', String('true') );
      }
      sitter.child('jobs').forEach(job => {
        this.sitterProfile.jobs.push({
          idJob: job.exportVal().idJob,
          id: job.exportVal().id,
          jobDate: job.exportVal().jobDate,
          jobLength: +job.exportVal().jobLength,
          jobLocation: job.exportVal().jobLocation,
          nameSender: job.exportVal().nameSender,
          numChildren: +job.exportVal().numChildren,
          openFRJ: job.exportVal().openFRJ,
          phoneNumber: job.exportVal().phoneNumber,
          jobStatus: job.exportVal().jobStatus
        });
      });

      this.personalInfoForm.patchValue({
        firstName: this.sitterProfile.firstName,
        lastName: this.sitterProfile.lastName,
        email: this.sitterProfile.email,
        phoneNumber: this.sitterProfile.phoneNumber,
        jobStatus: this.sitterProfile.jobEducation
      });
      this.jobInformationForm.patchValue({
        numberOfChildrenHandling: this.sitterProfile.numberOfChildrenHandling.toString(),
        displacement: this.sitterProfile.displacement,
        experienceYears: this.sitterProfile.experienceYears
      });

      this.aboutMeForm.patchValue({
        aboutMeText: this.sitterProfile.aboutMe
      });

      this.notificationForm.patchValue({
        emailSub: this.sitterProfile.notifications.emailSub,
        jobRequest: this.sitterProfile.notifications.jobRequest,
        reviewsReceived: this.sitterProfile.notifications.reviewsReceived,
        emailSubCheck: this.newsLetterChecked
      });

      this.availabilityForm.patchValue({
        available: this.available,
        availabilityDate: this.sitterProfile.availabilityDate,
        duration: this.sitterProfile.availabilityDuration,
        openJob: this.sitterProfile.availablityOpenForRegularJob,
        availabilityAdditionalInfo: this.sitterProfile.availabilityAdditionalInfo
      });
    } );

  }


  changeAvailability() {
    this.available = !this.available;
  }

  checkBoxChange() {
    this.checkBoxChecked = !this.checkBoxChecked;
  }


  clickPic() {
    document.getElementById('imageUpload').click();
  }

  onUploadPicture(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      const metaData = {contentType: file.type};
      const storageRef = firebase.storage().ref(`pictures/${this.authService.userId}`);
      storageRef.put(file, metaData).then(res =>
        res.ref.getDownloadURL().then(downloadLink => {
          this.url = downloadLink;
          firebase.database().ref(`sitters/${this.authService.userId}`).update({
            imageURL: 'https://firebasestorage.googleapis.com/v0/b/webprojectbackend.appspot.com/o/pictures%2F'
              + this.authService.userId + '?alt=media'
          });
        })
      );
    } else {alert('No Picture Has Been Selected'); }
  }

  ngOnInit(): void {


  }

  initForms() {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(18)]],
      lastName: ['', [Validators.required, Validators.maxLength(18)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      jobStatus: ['', [Validators.required, Validators.maxLength(40)]]

    });
    this.newPasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]],
      newPassword: ['', [Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]],
      confirmNewPassword: ['',
        [Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]],

    });
    this.jobInformationForm = this.formBuilder.group({
      numberOfChildrenHandling: ['', Validators.required],
      displacement: ['', Validators.required],
      experienceYears: ['', [Validators.required, Validators.min(0), Validators.maxLength(60)]],
    });

    this.aboutMeForm = this.formBuilder.group({
      aboutMeText: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(50)]]
    });

    this.availabilityForm = this.formBuilder.group({
      available: [],
      availabilityDate: ['', Validators.required],
      duration: ['', Validators.required],
      openJob: ['', Validators.required],
      availabilityAdditionalInfo: ['', Validators.maxLength(300)]
    });

    this.notificationForm = this.formBuilder.group({
      emailSub: ['', [Validators.required, Validators.email]],
      emailSubCheck: [''],
      jobRequest: [''],
      reviewsReceived: ['']
    });

    }
  onSavePI(formValue) {
    this.savingPI = true;
    if (this.personalInfoForm.valid) {
      this.sitterAccountService.savePI(formValue);
    } else {
      this.savingPI = false;
      for (let i = 0 ; i < this.changedPI.length; i++) { this.changedPI[i] = true; }
    }
  }
  onSaveNP(formValue) {
    this.savingNP = true;
    if (this.personalInfoForm.valid) {
      this.sitterAccountService.saveNP(formValue);
    } else {
      this.savingNP = false;
      for (let i = 0 ; i < this.changedNP.length; i++) { this.changedNP[i] = true; }
    }
  }
  onSaveJI(formValue) {
    this.savingJI = true;
    if (this.personalInfoForm.valid) {
      this.sitterAccountService.saveJI(formValue, this.sitterProfile.childAge, this.sitterProfile.certificates);
    } else {
      this.savingJI = false;
      for (let i = 0 ; i < this.changedJI.length; i++) { this.changedJI[i] = true; }
    }
  }
  onSaveAM(formValue) {
    this.savingAM = true;
    if (this.personalInfoForm.valid) {
      this.sitterAccountService.saveAM(formValue);
    } else {
      this.savingAM = false;
      this.changedAM = true;
    }
  }

  onSaveAV(formValue) {
    this.savingAvailability = true;
    if (this.available) {
    if (this.availabilityForm.valid) {
      this.sitterAccountService.saveAV(formValue);
    } else {
      for (let i = 0 ; i < this.changedAV.length; i++) { this.changedAV[i] = true; }

    }} else {
      this.sitterAccountService.saveAV(formValue);
    }
    this.savingAvailability = false;
  }
  subscribeChange(formValue) {
    if (this.newsLetterChecked) {
      document.querySelector('#subscribeEmail').removeAttribute('disabled');
      this.newsLetterChecked = !this.newsLetterChecked;
    } else {
      if (this.notificationForm.controls.emailSub.invalid) {
        this.changedNotif = true;
        document.querySelector('#emailSubCheck').setAttribute('ng-reflect-checked', 'false');
        document.querySelector('#emailSubCheck').setAttribute('ngModel', 'false');
      } else {
        this.newsLetterChecked = !this.newsLetterChecked;
        document.querySelector('#subscribeEmail').setAttribute('disabled', String('true') );
      }
    }
    this.onUpdateNotifications(formValue);
  }

  onUpdateNotifications(formValue) {
    this.sitterAccountService.updateNotifications(formValue);
  }

  acceptClick(i) {
    this.sitterProfile.acceptClick(i);
    this.sitterAccountService.acceptClick(this.sitterProfile.jobs[i].idJob, this.sitterProfile.firstName, this.sitterProfile.lastName,
      this.sitterProfile.phoneNumber, this.sitterProfile.jobs[i].id, this.url);
  }

  rejectClick(i) {
    this.sitterProfile.rejectClick(i);
    this.sitterAccountService.rejectClick(this.sitterProfile.jobs[i].idJob, this.sitterProfile.firstName, this.sitterProfile.lastName,
      this.sitterProfile.jobs[i].id, this.url);

  }

  deleteJob(i) {
    this.sitterProfile.deleteJob(i);
    this.sitterAccountService.deleteJob(this.sitterProfile.jobs[i].idJob);

  }


}
