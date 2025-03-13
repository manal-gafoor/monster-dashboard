import { Component } from '@angular/core';
import { tabIcons } from 'src/app/models/tab-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tabIcons = tabIcons;
}
