import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.doLogout();
  }

  onMyAccount() {
    if (this.authService.isParent) {
      this.router.navigate([`profile/parent/${this.authService.userId}`]);
    } else {
      this.router.navigate([`profile/sitter/${this.authService.userId}`]);

    }
  }
}
