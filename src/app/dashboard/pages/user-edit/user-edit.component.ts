import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllUsuarios, UserInterface } from '@interfaces/req-users-interface';
import { UserSrpingService } from '@services/user-srping.service';
import { TitleComponent } from '@shared/title/title.component';
import { format } from 'date-fns';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, TitleComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styles: ``
})
export default class UserEditComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private servicioUsuario = inject(UserSrpingService);

  formUsuario = new FormGroup({
    id: new FormControl(0),
    nombres: new FormControl(''),
    apellidos: new FormControl(''),
    nick_name: new FormControl(''),
    fecha_nacimiento: new FormControl(new Date()),
    fecha_creacion: new FormControl(new Date()),
    fecha_modificacion: new FormControl(new Date())
  });

  public titulo = computed(() => {
    const user = this.usuario();
    return user ? `Información de ${user.nombres} ${user.apellidos}` : `Información de usuario.`;
  });

  public usuario = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.servicioUsuario.getUserById(id))
    )
  );

  base = this.route.params.pipe(
    switchMap(({ id }) => this.servicioUsuario.getUserById(id))
  )

  constructor() {}

  ngOnInit() {    
    
    this.base.subscribe(user => this.updateForm(user))

  }

  updateForm(user:any) {
    // Se suscribe a los cambios de la señal 'usuario' para actualizar el formulario cuando los datos estén disponibles
    
    if (user) {

      let fechaNacimiento = user.fechaNacimiento ? user.fechaNacimiento : new Date()
      console.log(user)

      this.formUsuario.setValue({
        id: user.id ? user.id : 1,
        nombres: user.nombres || '',
        apellidos: user.apellidos || '',
        nick_name: user.nickName || '',
        fecha_nacimiento: user.fechaNacimiento,
        fecha_creacion: new Date(user?.fecha_creacion) || new Date(),
        fecha_modificacion: new Date(user?.fecha_modificacion) || new Date()
      });
    } else {
      console.log('No user data available yet.');
    }
  }



  handleSubmit() {
    // Implementar la lógica de envío del formulario
    console.log('d', this.formUsuario.value.nick_name, this.formUsuario.value.fecha_nacimiento)
    this.servicioUsuario.updateUserById(
      this.formUsuario.value.id ?? null,
      this.formUsuario.value.nombres ?? '',
      this.formUsuario.value.apellidos ?? '',
      this.formUsuario.value.nick_name ?? '',
      this.formUsuario.value.fecha_nacimiento ?? new Date()
    )
  }
}
