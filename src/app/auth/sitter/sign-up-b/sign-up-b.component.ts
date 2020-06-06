import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up-b',
  templateUrl: './sign-up-b.component.html',
  styleUrls: ['./sign-up-b.component.scss']
})
export class SignUpBComponent implements OnInit {
  sitterForm: FormGroup;
  changed = [false, false, false, false, false, false, false, false, false, false];
  submitting = false;

  cities = [
    'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes' , 'Gafsa' , 'Jendouba' , 'Kasserine' , 'Kairouan' , 'Kebili' , 'Kef' ,
    'Mahdia' , 'Manouba' , 'Medenine' , 'Monastir' , 'Nabeul' , 'Sfax' , 'Siliana' , 'Sidi Bouzid' , 'Sousse' , 'Tataouine' ,
    'Tozeur' , 'Tunis' , 'Zaghouan' ];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.sitterForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      phoneNumber: ['', [Validators.required , Validators.pattern('^[0-9]{8}$') ]],
      email: ['', [Validators.required , Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]],
      confirmedPassword: ['', Validators.required],
      city: ['', Validators.required],
      ZIP: ['', [Validators.required, Validators.pattern('^\\d{4}$')]],
      gender: ['', Validators.required ],
      birthday: ['', Validators.required]
    });
  }

  onRegister(formValue) {
    this.submitting = true;
    if (this.sitterForm.valid) {
      this.authService.doRegisterAsSitter(formValue);
    } else {
      this.submitting = false;
      for (let i = 0 ; i < this.changed.length; i++) { this.changed[i] = true; }
    }

  }
}
