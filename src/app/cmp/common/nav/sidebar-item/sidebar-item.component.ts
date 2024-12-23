import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../../../model/nav/menu/menu';
import {Router} from '@angular/router';
import {NavService} from '../../../../svc/nav/nav.service';
import {NgClass, NgFor, NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import {MatListItem} from '@angular/material/list';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
	selector: 'nav-sidebar-item',
	imports: [
		NgFor,
		NgIf,
		NgClass,
		NgStyle,
		MatListItem,
		NgOptimizedImage
	],
	templateUrl: './sidebar-item.component.html',
	styleUrl: './sidebar-item.component.scss',
	animations: [
		trigger('indicatorRotate', [
			state('collapsed', style({transform: 'rotate(0deg)'})),
			state('expanded', style({transform: 'rotate(180deg)'})),
			transition('expanded <=> collapsed',
				animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
			)
		])
	]
})
export class SidebarItemComponent implements OnInit {
	expanded = true;

	@HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

	@Input() item!: MenuItem;
	@Input() depth = 0;

	constructor(public navService: NavService, public router: Router) {
	}

	ngOnInit(): void {
		this.navService.currentUrl.subscribe(url => {
			if (this.item.route && url) {
				this.expanded = url.indexOf(`/${this.item.route}`) === 0;
				this.ariaExpanded = this.expanded;
			}
		});
	}

	onItemSelected(item: MenuItem) {
		if (!item.disabled) {
			if (!item.children || !item.children.length) {
				this.router.navigate([item.route]);
			}
			if (item.children && item.children.length) {
				this.expanded = !this.expanded;
			}
		}
	}
}
