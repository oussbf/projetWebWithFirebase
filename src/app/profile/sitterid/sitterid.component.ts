import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SitterAccountService} from '../../services/sitter-account.service';

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

  url: string | ArrayBuffer = 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
  accepted = false;
  rejected = false;
  available = false;
  newsLetterChecked = false;
  checkBoxChecked = false;
  changedPI  = [false, false, false , false, false];
  changedNP = [false, false, false];
  changedJI = [false, false, false];
  changedAM = false;
  changedAV = [false, false, false, false];
  changedNotif = false;

  jobs = [
    {
      idSender: '1',
      nameSender: 'Oussama',
      phoneNumber: '24772681',
      jobDate: '06/04/2020', /*Date*/
      jobLength: '2 days', /*format: n days / one day / one week*/
      jobLocation: 'Your House', /*format: your house / address */
      numChildren: '2',
      openForRegularJob: 'yes'
    },
    {
      idSender: '2',
      nameSender: 'achoik',
      phoneNumber: '24772681',
      jobDate: '06/04/2020', /*Date*/
      jobLength: ' 1 day', /*format: n days / one day / one week*/
      jobLocation: 'Your House', /*format: your house / address */
      numChildren: '3',
      openForRegularJob: 'no',
      accepted: false,
      rejected: false
    }

  ];

  ratings = [
    {},
    {}
  ];

  constructor(private formBuilder: FormBuilder , private sitterAccountService: SitterAccountService) { }

  deleteJob(i) {
    this.jobs.splice(i, 1);
  }

  acceptClick(i) {
    this.jobs[i].accepted = true;
  }

  rejectClick(i) {
    this.jobs[i].rejected = true;
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
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }

  ngOnInit(): void {
    this.initForms();
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
      childAge: [''],
      certif: ['']
    });

    this.aboutMeForm = this.formBuilder.group({
      aboutMeText: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(50)]]
    });

    this.availabilityForm = this.formBuilder.group({
      availabilityDate: ['', Validators.required],
      duration: ['', Validators.required],
      openJob: ['', Validators.required],
      availabilityAdditionalInfo: ['', Validators.maxLength(300)]
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
      this.sitterAccountService.savePI(formValue).then(res => {
        window.location.reload();
      }, err => console.log(err));
    } else {
      for (let i = 0 ; i < this.changedPI.length; i++) { this.changedPI[i] = true; }
    }
  }
  onSaveNP(formValue) {
    if (this.personalInfoForm.valid) {
      this.sitterAccountService.saveNP(formValue).then(res => {
        window.location.reload();
      }, err => console.log(err));
    } else {
      for (let i = 0 ; i < this.changedNP.length; i++) { this.changedNP[i] = true; }
    }
  }
  onSaveJI(formValue) {
    if (this.personalInfoForm.valid) {
      this.sitterAccountService.saveJI(formValue).then(res => {
        window.location.reload();
      }, err => console.log(err));
    } else {
      for (let i = 0 ; i < this.changedJI.length; i++) { this.changedJI[i] = true; }
    }
  }
  onSaveAM(formValue) {
    if (this.personalInfoForm.valid) {
      this.sitterAccountService.saveAM(formValue).then(res => {
        window.location.reload();
      }, err => console.log(err));
    } else {this.changedAM = true; }
  }

  onSaveAV(formValue) {
    if (this.availabilityForm.valid) {
      this.sitterAccountService.saveAV(formValue).then(res => {
        window.location.reload();
      }, err => console.log(err));
    } else {
      for (let i = 0 ; i < this.changedAV.length; i++) { this.changedAV[i] = true; }

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
    this.sitterAccountService.updateNotifications(formValue).then(res => {
    }, err => console.log(err));
  }


}
