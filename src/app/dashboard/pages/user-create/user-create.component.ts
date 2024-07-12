import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, TitleComponent, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styles: ``
})
export class UserCreateComponent {
  
}
