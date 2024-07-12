import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section [ngClass]="['w-full h-[600px]', classCss]">
      Hola mundo
    </section>
  `,
  styles: ``
})
export class HeavyLoadersSlowComponent {

  @Input({required: true}) classCss!:string
  
  constructor(){

    const start = Date.now()

    while(Date.now() - start < 3000){

    }
    console.log('Cargado...')
  }
}
