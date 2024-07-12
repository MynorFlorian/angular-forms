import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  nombre = 'usuario'
  userIsLogged = true
}
