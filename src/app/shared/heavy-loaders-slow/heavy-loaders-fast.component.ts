import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-fast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section [ngClass]="['w-full h-[600px]', classCss]">
      <ng-content></ng-content>
      
    </section>
  `,
  styles: ``
})
export class HeavyLoadersFastComponent {

  @Input({required: true}) classCss!:string

  constructor () {
    console.log('heavy loader fast creado');
    
  }
}
