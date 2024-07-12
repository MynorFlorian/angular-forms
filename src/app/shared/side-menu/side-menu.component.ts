import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {

  public asdf = []

  

  public menuItems = routes
  .map((route) => route.children ?? [])
  .flat()
  .filter((route) => route && route.path 
  && route.path != 'edit/:id'
  )
  .filter((route) => !route.path?.includes(';'))
  

}
