import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SelectComponent
  ],
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
