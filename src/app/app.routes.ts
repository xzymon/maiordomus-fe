import { Routes } from '@angular/router';
import {StarterSpringComponent} from './cmp/starter/starter-spring/starter-spring.component';

export const routes: Routes = [
  { path: '', redirectTo: 'starter-spring', pathMatch: 'full' },
  { path: 'starter-spring', component: StarterSpringComponent },
];
