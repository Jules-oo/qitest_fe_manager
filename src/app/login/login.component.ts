import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../_services/navbar.service';
import { AuthenticationService } from '../_services/authentication.serivce';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-login',
  providers: [HttpClient, AuthenticationService, NavbarService],
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: any = {};
  loading = false;
  error = '';
  vista!: boolean;

  constructor(
    private router: Router,
    public nav: NavbarService,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.nav.hide();
    this.authService.logout();
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password).subscribe({
      next: (result) => {
        if (result === true) {
          this.router.navigate(['home']);
        } else {
          this.error = 'Username o password non corretti';
          this.loading = false;
        }
      }
    })
  }

}
