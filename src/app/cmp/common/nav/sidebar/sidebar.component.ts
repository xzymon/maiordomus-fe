import {Component, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatNavList} from '@angular/material/list';
import {MenuItem, navSidebarMenu} from '../../../../model/nav/menu/menu';
import {NavService} from '../../../../svc/nav/nav.service';
import {SidebarItemComponent} from '../sidebar-item/sidebar-item.component';
import {NgFor} from '@angular/common';

@Component({
  selector: 'nav-sidebar',
	imports: [
		NgFor,
		RouterOutlet,
		MatSidenav,
		MatSidenavContainer,
		MatSidenavContent,
		MatNavList,
		SidebarItemComponent
	],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

	public menu: MenuItem[] = navSidebarMenu;

	@ViewChild(MatSidenav) sidenav!: MatSidenav;

	constructor(public navService: NavService) {

	}
}
