import { Routes } from '@angular/router';

import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';

import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'login', component: Login },

  { path: 'trips', component: TripListing },

  // Protected
  { path: 'add', component: AddTrip, canActivate: [authGuard] },
  { path: 'edit/:tripCode', component: EditTrip, canActivate: [authGuard] },

  { path: '**', redirectTo: 'trips' }
];