import { Routes } from '@angular/router';
import {StarterSpringComponent} from './cmp/starter/starter-spring/starter-spring.component';
import {CandlesComponent} from './cmp/candles/candles.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'starter-spring', pathMatch: 'full' },
	{ path: 'starter-spring', component: StarterSpringComponent },
	{ path: 'candles', component: CandlesComponent }
];
