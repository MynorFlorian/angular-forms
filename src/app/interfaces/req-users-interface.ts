import { AbstractControl } from '@angular/forms';

export interface AllUsuarios {
    usuarios: UserInterface[],
    loading: boolean
}

export interface UserInterface {
    id:                 number;
    nombres:            string;
    apellidos:          string;
    nick_name:          string;
    fecha_nacimiento:   Date;
    fecha_creacion:     Date;
    fecha_modificacion: Date;
}



export interface UserFormInterface {
    id: AbstractControl<number | null>;
    nombres: AbstractControl<string>;
    apellidos: AbstractControl<string>;
    nick_name: AbstractControl<string>;
    fecha_nacimiento: AbstractControl<Date>;
    fecha_creacion: AbstractControl<Date>;
    fecha_modificacion: AbstractControl<Date>;
}

export interface propiedades {

}