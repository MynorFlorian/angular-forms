import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AllUsuarios, UserInterface } from '@interfaces/req-users-interface';
import { UserSrpingService } from '@services/user-srping.service';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [CommonModule, 
    TitleComponent, RouterModule, 
    FormsModule, ReactiveFormsModule],
  templateUrl: './users-form.component.html',
  styles: ``
})
export default class UsersFormComponent { 
  
  public usuariosServices:any = inject(UserSrpingService)
  public create = signal(false)

  favoriteColor = 'asf'

  formUsuario:FormGroup 

  // ngOnInit() {
  //     this.formUsuario.value.nombres = 'Estui'
  //     console.log('Estui')
  //     // De esta forma se setea al inicio
  //     this.formUsuario.setControl('nombres', new FormControl('Estui'))
  // }

  constructor(){
    console.log(this.usuariosServices.usuarios());
    this.formUsuario = new FormGroup({
      id: new FormControl(null),
      nombres: new FormControl(null,[Validators.required]),
      apellidos: new FormControl("", [Validators.required]),
      nick_name: new FormControl(""),
      fecha_nacimiento: new FormControl(new Date(), [Validators.required, this.dateValidator]),
      fecha_creacion: new FormControl(new Date()),
      fecha_modificacion: new FormControl(new Date())
    })
  }

  handleOnSubmit(){
    if (this.formUsuario.valid) {
      // Lógica de envío del formulario si es válido
      console.log('Formulario enviado', this.formUsuario.value);
      this.usuariosServices.createUser(
        this.formUsuario.value.nombres,
        this.formUsuario.value.apellidos,
        this.formUsuario.value.nick_name,
        this.formUsuario.value.fecha_nacimiento
      )
    } else {
      // Lógica para manejar el formulario inválido
      this.markFormGroupTouched(this.formUsuario);
    }
  }

  private dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const dateValue = control.value;
    if (dateValue && isNaN(Date.parse(dateValue))) {
      return { invalidDate: true };
    }
    return null;
  }

  // Método para marcar todos los controles como tocados
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control:any = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  handleCreate(){
    this.create.set(!this.create())
    if(!this.create()){
      this.usuariosServices.cargarUsuarios()
    }
  }

}
