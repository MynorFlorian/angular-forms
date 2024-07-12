import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { User, UserRes, UserResponse } from '@interfaces/req-interface';
import { delay, map, pipe } from 'rxjs';

interface State {
  users:User[]
  loading:boolean
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient)
  #baseUrl = "https://reqres.in/api/users"

  #state = signal<State>({
    loading: true,
    users: []
  })

  public users = computed(() => 
    this.#state().users
  )

  public loading = computed(() => 
    this.#state().loading
  )


  constructor() 
  { 
    
    this.http.get<UserResponse>(`${this.#baseUrl}`).
    pipe(delay(1000)).
    subscribe(res => {
      console.log('res',res.data)
      this.#state.set({
        loading: false,
        users: res.data
      })
    })
  }

  getUserById(id:string){
    return this.http.get<UserRes>(`${this.#baseUrl}/${id}`).
    pipe(delay(1000),
      map(res => res.data)
    )
    // subscribe(res => {
    //   console.log('res',res.data)
    //   this.#state.set({
    //     loading: false,
    //     users: res.data
    //   })
    // })
  }

}
