import { Component } from '@angular/core';
import {TopbarComponent} from './cmp/common/nav/topbar/topbar.component';
import {SidebarComponent} from './cmp/common/nav/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'maiordomus-fe';
}
