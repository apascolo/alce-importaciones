import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  booleanAttribute,
  inject,
} from '@angular/core';
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { codesPhone } from '@constants/codes-phone.constant';
import { ICodeOption } from '@interfaces/index';

@Component({
    selector: 'app-phone-field',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './phone-field.component.html',
    styleUrl: './phone-field.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneFieldComponent implements OnInit {
  @Input() label: string = 'Teléfono';
  @Input({ required: true }) controlNameSelect: string;
  @Input({ required: true }) controlNameInput: string;
  @Input({ transform: booleanAttribute }) hasError = false;
  @Input({ transform: booleanAttribute }) required = false;
  @Input() placeholder: string = '';
  @Input() minlength: string;
  @Input() maxlength: string;
  @Input() classes: string;

  public fgd = inject(FormGroupDirective);

  public openSelect = false;
  public selectedCode: string;
  public selectedFlag: string;
  public flagsCode: ICodeOption[] = codesPhone;

  ngOnInit(): void {
    this.handleCodePhone(this.flagsCode[0]);
  }

  handleToggleSelect(event: Event) {
    event.stopPropagation();
    this.openSelect = !this.openSelect;
  }
  handleClickOutside() {
    this.openSelect = false;
  }
  handleCodePhone(value: ICodeOption) {
    this.fgd.form.patchValue({ [this.controlNameSelect]: value.code });
    this.selectedFlag = value.flag;
    this.selectedCode = value.code;
  }
}
