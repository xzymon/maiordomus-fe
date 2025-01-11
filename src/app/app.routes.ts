import { Routes } from '@angular/router';
import {StarterSpringComponent} from './cmp/starter/starter-spring/starter-spring.component';
import {QuarterlyCandlesTableComponent} from './cmp/quarterly-candles-table/quarterly-candles-table.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'starter-spring', pathMatch: 'full' },
	{ path: 'starter-spring', component: StarterSpringComponent },
	{ path: 'quarterly-candles-tab', component: QuarterlyCandlesTableComponent }
];
