import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { User } from '@interfaces/req-interface';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './user.component.html',
  styles: ``
})
export default class UserComponent {
  private route = inject(ActivatedRoute)  
  private usersService = inject(UsersService)

  public titulo = computed(() => {
    if(this.user()){
      return `Informacion de ${this.user()?.first_name} ${this.user()?.last_name}`
    } else {
      return 'Informacion de usuario'
    }
  })

  public user = toSignal(
    this.route.params.pipe(
      switchMap(({id}) => this.usersService.getUserById(id))
    )
  )

  getTitulo(){
    return this.user()?.first_name && this.user()?.last_name ?
    `${this.user()?.first_name} ${this.user()?.last_name}` :
    'Información del usuario.'
  }
  // constructor(){
  //   console.log(this.route.params.subscribe(params => {
  //     console.log(params);
      
  //   }))
  // }
}
