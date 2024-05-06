import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, NzMessageModule],
  exports: [ButtonComponent],
})
export class SharedModule {}
