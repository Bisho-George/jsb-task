import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './CustomButton/CustomButton.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CustomButtonComponent, LoadingSpinnerComponent],
  exports: [CustomButtonComponent, LoadingSpinnerComponent]
})
export class SharedModule { }
