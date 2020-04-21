import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  errorMessage = '';
  changed = [false, false];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();

  }
  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required , Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]]
    });
  }
  onSubmitSignIn(formValue) {
    if (this.signInForm.valid) {
      this.authService.doLogin(formValue).then(res => {
         this.router.navigate(['viewprofile/parent']);
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
        });

    } else {
      for (let i = 0 ; i < this.changed.length; i++) { this.changed[i] = true; }
    }
  }

}
