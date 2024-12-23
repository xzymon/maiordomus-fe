import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {NavigationEnd} from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class NavService {
	public currentUrl = new BehaviorSubject<string>('');
	public toggleSidebar = new Subject<boolean>();

	constructor(private router: Router) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.currentUrl.next(event.urlAfterRedirects);
			}
		});
	}
}
