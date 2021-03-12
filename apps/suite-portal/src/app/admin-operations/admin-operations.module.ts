import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOperationsComponent } from './admin-operations.component';
import { SharedModule } from '../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [AdminOperationsComponent],
  exports: [AdminOperationsComponent]
})
export class AdminOperationsModule { }
