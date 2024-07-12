import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '@shared/side-menu/side-menu.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideMenuComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {

}
