import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Directive({
  selector: '[appTrackFormChange]',
  exportAs: 'appTrackFormChange',
  standalone: true,
  providers: [ReactiveFormsModule, CommonModule]
})
export class TrackFormChangeDirective implements AfterViewInit {
  @Input() shouldCheck = false;
  @Output() formChanges: EventEmitter<boolean> = new EventEmitter<boolean>();
  private initialFormValue!: any;
  formHasChanges: boolean = false;

  constructor(private formGroupDirective: FormGroupDirective, ) {
    console.log('call')
  }

  ngAfterViewInit() {
    console.log('df')
    if (true) {
      const allNull = isObjectFalsy(this.formGroupDirective.value);

      //If all form fields are not null
      if (!allNull) {
        this.initialFormValue = this.formGroupDirective.value;
      }

      this.formGroupDirective.valueChanges.subscribe({
        next: (initialValues) => {
          if (!this.initialFormValue) {
            this.initialFormValue = initialValues;
            return;
          }
          console.log(initialValues)
          this.checkFormChanges();
        },
      });

      setTimeout(() => {
        this.formHasChanges = !this.formHasChanges;
      }, 0);
    }
  }

  private checkFormChanges() {
    console.log(this.initialFormValue)
    console.log(this.formGroupDirective.value)
    const formHasChanges =
      JSON.stringify(this.initialFormValue) ===
      JSON.stringify(this.formGroupDirective.value);
    this.formHasChanges = formHasChanges;
    this.formChanges.emit(formHasChanges);
  }
}

function isObjectFalsy(obj: any) {
  for (const key in obj) {
    if (obj[key] !== null) {
      return false;
    }
  }
  return true;
}
