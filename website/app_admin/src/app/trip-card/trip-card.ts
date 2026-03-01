import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  @Input() trip?: Trip;
  @Output() deleted = new EventEmitter<void>();

  deleting = false;

  constructor(
    private tripDataService: TripDataService,
    public auth: Authentication
  ) {}

  deleteTrip(): void {
    if (!this.trip) return;

    if (!confirm(`Delete ${this.trip.code}?`)) return;

    this.deleting = true;
    this.tripDataService.deleteTrip(this.trip.code).subscribe({
      next: () => {
        this.deleting = false;
        this.deleted.emit();
      },
      error: (err) => {
        console.error(err);
        this.deleting = false;
        alert('Delete failed');
      }
    });
  }
}