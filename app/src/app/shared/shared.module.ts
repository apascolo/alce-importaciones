import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';
import { TextFieldComponent } from '@components/text-field/text-field.component';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [ButtonComponent, TextFieldComponent],
  imports: [CommonModule, NzMessageModule, ReactiveFormsModule],
  exports: [ButtonComponent, TextFieldComponent],
})
export class SharedModule {}
