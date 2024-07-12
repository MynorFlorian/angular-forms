import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { AllUsuarios, UserInterface } from '@interfaces/req-users-interface';
import { map } from 'rxjs';

interface State{
  usuarios: UserInterface[],
  loading: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserSrpingService {
  private http = inject(HttpClient)
  #baseUrl = "http://localhost:8080/user"

  #state = signal<State>({
    usuarios: [],
    loading: true
    // id: 0,
    // nombres: '',
    // apellidos: '',
    // nick_name: '',
    // fecha_naciemiento: new Date(),
    // fecha_creacion: new Date(),
    // fecha_modificacion: new Date()
  })

  public usuarios = computed(() => 
    this.#state().usuarios
  )

  public cargando = computed(() => 
    this.#state().loading
  )

  constructor() { 
    this.http.get<AllUsuarios>(`${this.#baseUrl}/all`).
    subscribe((res:any) => {
      // console.log("Chipi",res)
      this.#state.set({
        loading: false,
        usuarios: res
      })
    })
  }

  cargarUsuarios(){
    this.http.get<AllUsuarios>(`${this.#baseUrl}/all`).
    subscribe((res:any) => {
      // console.log("Chipi",res)
      this.#state.set({
        loading: false,
        usuarios: res
      })
    })
  }

  getUserById(id:string){
    
    return this.http.get<AllUsuarios>(`${this.#baseUrl}/${id}`).
    pipe(map((res:any) => res))
  }

  updateUserById(id:number|null, nombres:string, apellidos:string, nick_name:string, fecha_naciemiento:Date){
    
    this.http.put(`${this.#baseUrl}/${id}`,{
      id,
      nombres,
      apellidos,
      nickName:nick_name,
      fechaNacimiento: fecha_naciemiento
    }).subscribe(response => {
      // Manejar la respuesta si es necesario
      console.log('costa',response);
      
    }, error => {
      // Manejar errores si ocurren
      console.log('error', error);
      
    });
  }

  createUser(nombres:string, apellidos:string, 
    nick_name:string, fecha_naciemiento:Date){
      
      this.http.post(`${this.#baseUrl}`,{
      nombres,
      apellidos,
      nickName:nick_name ?? nombres + ' ' + apellidos,
      fechaNacimiento: fecha_naciemiento ?? new Date()
    }).subscribe(response => {
      // Manejar la respuesta si es necesario
      console.log('costa',response);
      
    }, error => {
      // Manejar errores si ocurren
      console.log('error', error);
      
    });
  }
}
