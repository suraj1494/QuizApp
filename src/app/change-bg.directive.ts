import { Directive, Input} from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {
  @Input() isCorrect:Boolean=false;
  constructor(private ef:ElementRef,) { }

}
