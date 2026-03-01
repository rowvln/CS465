import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize, timeout } from 'rxjs/operators';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { TripCard } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  loading = true;
  error = '';

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.loading = true;
    this.error = '';

    this.tripDataService.getTrips()
      .pipe(
        timeout(5000),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (data) => this.trips = data,
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load trips';
        }
      });
  }

  onDeleted(): void {
    this.loadTrips();
  }
}