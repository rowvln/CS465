import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css',
})
export class AddTrip {
  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  saving = false;
  error = '';

  constructor(private tripDataService: TripDataService, private router: Router) {}

  onSubmit(): void {
    this.error = '';
    this.saving = true;

    this.tripDataService.addTrip(this.trip).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/trips']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to add trip (check required fields)';
        this.saving = false;
      }
    });
  }
}