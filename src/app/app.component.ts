import { Component } from '@angular/core';
import { tabIcons } from './models/tab-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monster-dashboard';
  tabIcons = tabIcons;
}
