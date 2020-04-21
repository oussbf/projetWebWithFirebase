import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParentAccountService} from '../../services/parent-account.service';

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

  messages = [
    {
      IDSender : '1',
      sender: 'Oussama',
      status : 'Declined',
      phoneNumber : '24772681'
    },
    {
      IDSender : '2',
      sender: 'Anis',
      status : 'Accepted',
      phoneNumber : '24772681'
    }
  ];
  favSitters = [
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


  addKid() {
    this.ArrayofkidsId.push('oussama');
  }

  deleteMessage(i) {
    this.messages.splice(i, 1);
  }


  deleteChild( i) {
    this.ArrayofkidsId.splice(i, 1);
  }

  deleteFavourite(i) {
    this.favSitters.splice(i, 1);
  }

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
  constructor(private formBuilder: FormBuilder, private parentAccountService: ParentAccountService) { }

  ngOnInit(): void {
    this.initForms();

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
      kidName: ['', [Validators.required, Validators.maxLength(18)]],
      kidAge: ['', Validators.required],
      otherHandicaps: ['',  Validators.maxLength(20)],
      comments: ['', Validators.maxLength(300)],
      childAge: ['', [Validators.required]],
      specialNeeds: ['']
    });
    this.notificationForm = this.formBuilder.group({
      emailSub: ['', [Validators.required, Validators.email]],
      emailSubCheck: [''],
      jobReqNotif: [''],
      favsAvailability: ['']
    });

  }

  onSavePI(formValue) {
    if (this.personalInfoForm.valid) {
      this.parentAccountService.savePI(formValue).then(res => {
          window.location.reload();
        }, err => console.log(err));
    } else {
      for (let i = 0 ; i < this.changedPI.length; i++) { this.changedPI[i] = true; }
    }
  }
  onSaveNP(formValue) {
    if (this.newPasswordForm.valid) {
      this.parentAccountService.saveNP(formValue).then(res => {
        window.location.reload();
        }, err => console.log(err));
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
    this.parentAccountService.updateNotifications(formValue).then(res => {
    }, err => console.log(err));
  }

}
