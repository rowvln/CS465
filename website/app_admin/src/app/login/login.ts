import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.html'
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: Authentication,
    private router: Router
  ) {}

  onLoginSubmit(): void {
    this.errorMessage = '';

    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['trips']),
      error: () => this.errorMessage = 'Login failed. Check email/password.'
    });
  }
}