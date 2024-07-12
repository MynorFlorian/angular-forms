import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserResponse } from '@interfaces/req-interface';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TitleComponent, RouterModule],
  templateUrl: './users.component.html',
  styles: ``
})
export default class UsersComponent {

  

  public usersService:any = inject(UsersService)

  constructor(){
    console.log(this.usersService.users());
    
  }

}
