import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParentAccountService} from '../../services/parent-account.service';
import {AuthService} from '../../services/auth.service';
import {ParentModal} from '../../services/parentModal.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-parent-id',
  templateUrl: './parent-id.component.html',
  styleUrls: ['./parent-id.component.scss']
})

export class ParentIdComponent implements OnInit {
  personalInfoForm: FormGroup;
  newPasswordForm: FormGroup;
  kidsForm: FormGroup;
  notificationForm: FormGroup;
  url: string | ArrayBuffer = 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
  ArrayofkidsId = ['Achoik'];
  newsLetterChecked = false;
  checkBoxChecked = false;
  otherSelectedChecked = false;
  changedPI  = [false, false, false , false];
  changedNP = [false, false, false];
  changedKid = [false, false, false , false];
  changedNotif = false;
  parentProfile: ParentModal;
  changedRequest = [false, false, false, false];
  requestForm: FormGroup;



  checkBoxChange() {
    this.checkBoxChecked = !this.checkBoxChecked;
  }
  othersSelectedChange() {
    this.otherSelectedChecked = !this.otherSelectedChecked;
  }
  clickPic() {
    document.getElementById('imageUpload').click();
  }

  onUploadPicture(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        this.parentAccountService.uploadPicture(this.url).then(res => {
          window.location.reload();
        }, err => console.log(err));
      };
    }
  }
  constructor(private formBuilder: FormBuilder, private parentAccountService: ParentAccountService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initForms();
    /* **************************************** FILLING ACCOUNT SETTINGS ********************************* */
    this.parentProfile = new ParentModal('' , '' , '' , '' , {}, '', '' , [] , [], []);
    firebase.database().ref().child(`parents/${this.authService.userId}`).on('value' , (res) => {
      this.parentProfile.firstName = res.exportVal().firstName;
      this.parentProfile.lastName = res.exportVal().lastName;
      this.parentProfile.email = res.exportVal().email;
      this.parentProfile.phoneNumber = res.exportVal().phoneNumber;
      this.parentProfile.notifications.emailSub = res.exportVal().notifications.emailSub;
      this.parentProfile.notifications.messagesReceived = res.exportVal().notifications.messagesReceived;
      this.parentProfile.notifications.favsAvailability = res.exportVal().notifications.favsAvailability;
      if (this.parentProfile.notifications.emailSub.length > 0) {
        this.newsLetterChecked = true; }
      this.personalInfoForm.patchValue({
          firstName: this.parentProfile.firstName,
          lastName: this.parentProfile.lastName,
          email: this.parentProfile.email,
          phoneNumber: this.parentProfile.phoneNumber
        });
      this.notificationForm.patchValue({
          emailSub: this.parentProfile.notifications.emailSub,
          emailSubCheck: this.newsLetterChecked,
          messagesReceived: this.parentProfile.notifications.messagesReceived,
          favsAvailability: this.parentProfile.notifications.favsAvailability
        });


      /* ********************************************** FILLING KIDS INFO *************************************************/
      res.child('kids').forEach(kid => {
        const y = [];
        kid.child('specialNeeds').forEach(specialNeed => {
          if ((specialNeed.key.toString() !== 'others')) {y.push(specialNeed.key); }
        });
        const x = {
          idKid: kid.exportVal().idKid,
          kidName: kid.exportVal().kidName,
          kidAge: kid.exportVal().kidAge,
          childAge: kid.exportVal().childAge,
          specialNeeds: y,
          otherSpecialNeed: kid.child('specialNeeds').exportVal().others,
          additionalInfo: kid.exportVal().additionalInfo
        };
        this.parentProfile.kids.push(x);
      });
      /* ********************************************** END FILLING KIDS INFO *************************************************/

      /* ********************************************** FILLING FAVOURITES INFO *************************************************/

      res.child('favourites').forEach(sitterId => {
        firebase.database().ref().child(`sitters/${sitterId.child('idFavourite').exportVal()}`).on('value', (sitter) => {
          const y: string[] = [];
          sitter.child('certificates').forEach(n => {if (n.exportVal()) {y.push(n.key.toString()); } });
          const x = {
            id: sitterId.child('idFavourite').exportVal(),
            firstName: sitter.exportVal().firstName,
            lastName: sitter.exportVal().lastName,
            experience: Number(sitter.exportVal().experienceYears),
            location: sitter.exportVal().city,
            description: sitter.exportVal().aboutMe,
            rating: 0,
            certificates : y,
            avgRating: +sitter.exportVal().avgRating
          };
          this.parentProfile.favourites.push(x);
        });
      });

      /* ********************************************** END FILLING FAVOURITES INFO *************************************************/

    } );
    /* **************************************** END FILLING ACCOUNT SETTINGS********************************* */
    firebase.database().ref().child(`parents/${this.authService.userId}/messages`).on('value' , (res) => {
    res.forEach(msg => {
      const x = {
        idMessage: msg.exportVal().idMessage,
        idSender: msg.exportVal().idSender,
        firstNameSender: msg.exportVal().firstNameSender,
        lastNameSender: msg.exportVal().lastNameSender,
        status: msg.exportVal().status,
        phoneNumber: msg.exportVal().phoneNumber
      };
      this.parentProfile.messages.push(x);
    });
    });
    }

  initForms() {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(18)]],
      lastName: ['', [Validators.required, Validators.maxLength(18)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]

    });

    this.newPasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]],
      newPassword: ['', [Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]],
      confirmNewPassword: ['',
        [Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]],

    });
   /* this.kidsForm = this.formBuilder.group({
      item: this.formBuilder.array([this.createItem()])
    });*/

    this.kidsForm = this.formBuilder.group({
      kidName: ['', [Validators.required, Validators.maxLength(18)]],
      otherHandicaps: ['',  Validators.maxLength(20)],
      comments: ['', Validators.maxLength(300)],
      kidAge: ['', Validators.required]
    });

    this.notificationForm = this.formBuilder.group({
      emailSub: ['', [Validators.required, Validators.email]],
      emailSubCheck: [''],
      messagesReceived: [''],
      favsAvailability: ['']
    });

    this.requestForm = this.formBuilder.group({
      requestedDate: ['', [Validators.required]],
      requestedDuration: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      requestedLocation: ['', Validators.required],
      requestedChildrenNbr: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      requestedNeedRegularJob: ['', Validators.required]
    });

  }

  /*createItem() {
    return this.formBuilder.group({
      kidName: ['', [Validators.required, Validators.maxLength(18)]],
      otherHandicaps: ['',  Validators.maxLength(20)],
      comments: ['', Validators.maxLength(300)],
      kidAge: ['', Validators.required]});
  }

  addNext() {
    (this.kidsForm.controls.items as FormArray).push(this.createItem());
  }*/

  addKid() {
    // this.addNext();
    this.parentProfile.addKid();
    this.parentAccountService.addKid(this.parentProfile.kids);
  }

  onSavePI(formValue) {
    if (this.personalInfoForm.valid) {
      this.parentAccountService.savePI(formValue);
    } else {
      for (let i = 0 ; i < this.changedPI.length; i++) { this.changedPI[i] = true; }
    }
  }
  onSaveNP(formValue) {
    if (this.newPasswordForm.valid) {
      this.parentAccountService.saveNP(formValue);
    } else {
      for (let i = 0 ; i < this.changedNP.length; i++) { this.changedNP[i] = true; }
    }
  }
  onSaveKid(formValue) {
    if (this.kidsForm.valid) {
      this.parentAccountService.saveKid(formValue).then(res => {
        window.location.reload();
        }, err => console.log(err));
    } else {
      for (let i = 0 ; i < this.changedKid.length; i++) { this.changedKid[i] = true; }
    }
  }
  subscribeChange(formValue) {
    if (this.newsLetterChecked) {
      this.newsLetterChecked = !this.newsLetterChecked;
    } else {
      if (this.notificationForm.controls.emailSub.invalid) {
        this.changedNotif = true;
        document.querySelector('#emailSubCheck').setAttribute('ng-reflect-checked', 'false');
        document.querySelector('#emailSubCheck').setAttribute('ngModel', 'false');
      } else {
        this.newsLetterChecked = !this.newsLetterChecked;
      }
    }
    this.onUpdateNotifications(formValue);
  }

  onUpdateNotifications(formValue) {
    this.parentAccountService.updateNotifications(formValue);
  }

  deleteMessage(i) {
    this.parentAccountService.deleteMessage(this.parentProfile.messages[i].idMessage);
    this.parentProfile.deleteMessage(i);
  }

  onSubmitRequest(formValue, i) {
    if (this.requestForm.valid) {
      this.parentAccountService.requestJob(formValue, this.parentProfile.favourites[i].id);
    } else {
      for (let j = 0 ; j < this.changedRequest.length; j++) { this.changedRequest[j] = true; }
    }
  }

  deleteFavourite(i) {
    this.parentAccountService.deleteFavourite(this.parentProfile.favourites[i].id);
    this.parentProfile.deleteFavourite(i);
  }

}
