import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../services/contact.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  changedContact = [false, false, false];
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();

  }
  initForm() {
    this.contactForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required , Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  onSend(formValue) {
    if (this.contactForm.valid) {
      this.contactService.send(formValue).then(res => {
        window.location.reload();
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });

    } else {
      for (let i = 0 ; i < this.changedContact.length; i++) { this.changedContact[i] = true; }
    }
  }

}
