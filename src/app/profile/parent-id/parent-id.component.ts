import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParentAccountService} from '../../services/parent-account.service';
import {AuthService} from '../../services/auth.service';
import {ParentModal} from '../../services/parentModal.service';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-parent-id',
  templateUrl: './parent-id.component.html',
  styleUrls: ['./parent-id.component.scss']
})

export class ParentIdComponent implements OnInit {
  @ViewChild('favouriteSubmit') favouriteSubmit: HTMLButtonElement;
  savingPI = false;
  savingNP = false;
  savingKids = false;
  personalInfoForm: FormGroup;
  newPasswordForm: FormGroup;
  kidsForm: FormGroup;
  notificationForm: FormGroup;
  url: string | ArrayBuffer = 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
  newsLetterChecked = false;
  checkBoxChecked =  false;
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

  othersSelectedChange(i) {
    this.kids.controls[i].get('othersCheckBox').setValue(!this.kids.controls[i].get('othersCheckBox').value);
    console.log('othersCheckBox value: ' + this.kids.controls[i].get('othersCheckBox').value);
    if (!this.kids.controls[i].get('othersCheckBox').value) {
      this.kids.controls[i].get('otherHandicaps').setValue('');
    }
  }

  clickPic() {
    document.getElementById('imageUpload').click();
  }

  onUploadPicture(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      const metaData = {contentType: file.type};
      const storageRef = firebase.storage().ref(`/pictures/${this.authService.userId}/`);
      storageRef.put(file, metaData).then(res =>
        res.ref.getDownloadURL().then(downloadLink => {
          this.url = downloadLink;
          firebase.database().ref(`parents/${this.authService.userId}`).update({
            imageURL: 'https://firebasestorage.googleapis.com/v0/b/webprojectbackend.appspot.com/o/pictures%2F'
              + this.authService.userId + '?alt=media'
          });
        })
      );
    } else {alert('No Picture Has Been Selected'); }
  }

  constructor(private formBuilder: FormBuilder,
              private parentAccountService: ParentAccountService,
              private authService: AuthService,
              private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.initForms();
    /* **************************************** FILLING ACCOUNT SETTINGS ********************************* */
    this.parentProfile = new ParentModal('' , '' , '' , '' , {}, '', '' , [] , [], []);
    firebase.database().ref().child(`parents/${this.authService.userId}`).once('value' , (res) => {
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
      this.parentProfile.imageUrl = res.exportVal().imageURL;
      if (this.parentProfile.imageUrl) {
        this.url = this.parentProfile.imageUrl;
      }


      /* ********************************************** FILLING KIDS INFO *************************************************/
      if (res.child('kids').hasChildren()) {
       res.child('kids').forEach(kid => {
         const y = [];
         kid.child('specialNeeds').forEach(specialNeed => {
           if (specialNeed.exportVal() === true) {
             y.push(specialNeed.key);
           }
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
         this.addKid(x.kidName, x.otherSpecialNeed, x.additionalInfo, x.kidAge, kid.child('specialNeeds').exportVal().others.length > 0 );

       });
     }
      /* ********************************************** END FILLING KIDS INFO *************************************************/

      /* ********************************************** FILLING FAVOURITES INFO *************************************************/

      res.child('favourites').forEach(sitterId => {
        firebase.database().ref().child(`sitters/${sitterId.child('idFavourite').exportVal()}`).once('value', sitter => {
          const y: string[] = [];
          sitter.child('certificates').forEach(certif => {if (certif.exportVal()) {y.push(certif.key.toString()); } });
          const x = {
            id: sitterId.child('idFavourite').exportVal(),
            firstName: sitter.exportVal().firstName,
            lastName: sitter.exportVal().lastName,
            experience: Number(sitter.exportVal().experienceYears),
            location: sitter.exportVal().city,
            description: sitter.exportVal().aboutMe,
            rating: 0,
            certificates : y,
            avgRate: +sitter.exportVal().avgRate,
            imageUrl: sitter.exportVal().imageURL
          };
          this.parentProfile.favourites.push(x);
        });
      });

      /* ********************************************** END FILLING FAVOURITES INFO *************************************************/

    } );
    /* **************************************** MESSAGES SETTINGS ********************************* */
    firebase.database().ref().child(`parents/${this.authService.userId}/messages`).once('value' , (res) => {
    res.forEach(msg => {
      const x = {
        idMessage: msg.exportVal().idMessage,
        idSender: msg.exportVal().idSender,
        firstNameSender: msg.exportVal().firstNameSender,
        lastNameSender: msg.exportVal().lastNameSender,
        status: msg.exportVal().status,
        phoneNumber: msg.exportVal().phoneNumber,
        imageURL: msg.exportVal().imageURL
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

    this.kidsForm = this.formBuilder.group({
      kids: this.formBuilder.array([])
    });

    this.notificationForm = this.formBuilder.group({
      emailSub: ['', [Validators.required, Validators.email]],
      emailSubCheck: [''],
      messagesReceived: [],
      favsAvailability: []
    });

    this.requestForm = this.formBuilder.group({
      requestedDate: ['', [Validators.required]],
      requestedDuration: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      requestedLocation: ['', Validators.required],
      requestedChildrenNbr: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      requestedNeedRegularJob: ['', Validators.required]
    });

  }

  newKid(kidName, otherHandicaps, comments, kidAge, othersCheckBox): FormGroup {
    return this.formBuilder.group({
      kidName: [kidName, [Validators.required, Validators.maxLength(18)]],
      otherHandicaps: [otherHandicaps,  Validators.maxLength(20)],
      comments: [comments, Validators.maxLength(300)],
      kidAge: [kidAge, Validators.required],
      othersCheckBox: [othersCheckBox]
    });
  }

  addKid(kidName, otherHandicaps, comments, kidAge, othersCheckBox) {
    this.kids.push(this.newKid(kidName, otherHandicaps, comments, kidAge, othersCheckBox));
  }

  get kids(): FormArray {
    return this.kidsForm.get('kids') as FormArray;
  }

  onSavePI(formValue) {
    this.savingPI = true;
    if (this.personalInfoForm.valid) {
      this.parentAccountService.savePI(formValue);
    } else {
      this.savingPI = false;
      for (let i = 0 ; i < this.changedPI.length; i++) { this.changedPI[i] = true; }
    }
  }

  onSaveNP(formValue) {
    this.savingNP = true;
    if (this.newPasswordForm.valid) {
      this.parentAccountService.saveNP(formValue);
    } else {
      this.savingNP = false;
      for (let i = 0 ; i < this.changedNP.length; i++) { this.changedNP[i] = true; }
    }
  }

  onSaveKid(kids) {
    this.savingKids = true;
    if (this.kidsForm.valid) {
      this.parentAccountService.addKid(this.parentProfile.kids, kids);
    } else {
      for (let i = 0 ; i < this.changedKid.length; i++) { this.changedKid[i] = true; }
    }
    this.savingKids = false;
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
    console.log('messages received ' + this.notificationForm.value.messagesReceived);
    console.log('favsAvailability ' + this.notificationForm.value.favsAvailability);
  }

  deleteMessage(i) {
    this.parentAccountService.deleteMessage(this.parentProfile.messages[i].idMessage);
    this.parentProfile.deleteMessage(i);
  }

  deleteKid(i) {
    this.parentProfile.deleteChild(i);
    this.kids.removeAt(i);
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
