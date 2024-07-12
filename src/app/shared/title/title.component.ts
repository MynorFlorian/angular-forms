import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.component.html',
  styles: ``
})
export class TitleComponent implements OnInit{

  @Input({required: true, }) titulo!:string
  @Input({transform: booleanAttribute, }) whitShadow!:boolean

  ngOnInit(): void {
      
  }

}
