import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize,timeout } from 'rxjs/operators';

import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css',
})
export class EditTrip implements OnInit {
  trip?: Trip;

  loading = true;
  saving = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    const tripCode = this.route.snapshot.paramMap.get('tripCode');
    if (!tripCode) {
      this.error = 'No trip code provided';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = '';

    this.tripDataService.getTrip(tripCode)
      .pipe(
        timeout(5000),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (data) => this.trip = data,
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load trip';
        }
      });
  }

  onSubmit(): void {
    if (!this.trip) return;

    this.saving = true;
    this.error = '';

    this.tripDataService.updateTrip(this.trip.code, this.trip).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/trips']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to update trip';
        this.saving = false;
      },
    });
  }
}