import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';

import { Authentication } from './services/authentication';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  constructor(
    public auth: Authentication,
    private router: Router
  ) {}

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}