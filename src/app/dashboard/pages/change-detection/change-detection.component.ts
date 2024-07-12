import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  standalone: true,
  changeDetection:  ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TitleComponent],
  templateUrl: './change-detection.component.html',
  styles: ``
})
export default class ChangeDetectionComponent {

  public currentFramework = computed(
    () => `Change detection ${this.frameworkAsSignal().name }`
  )

  public frameworkAsSignal = signal({
    name: 'angular',
    release: 2016
  })

  public frameworkAsProperty = {
    name: 'angular',
    release: 2016
  }

  constructor(){
    setTimeout(() =>{
      // this.frameworkAsProperty.name = 'React'
      this.frameworkAsSignal.update(value => ({
        ...value,
        name : 'React'}))
      console.log('Hecho')
    },3000)
  }
}
