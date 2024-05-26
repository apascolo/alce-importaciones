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
import { eDocumentType } from '@enums/document-type.enum';
import { IOption } from '@interfaces/option.interface';

@Component({
  selector: 'app-document-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './document-field.component.html',
  styleUrl: './document-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentFieldComponent implements OnInit {
  @Input() label: string = 'Documento de identidad';
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
  public types: IOption[] = [
    {
      value: eDocumentType.Venezolano,
      name: 'Venezolano (V)',
    },
    {
      value: eDocumentType.Extranjero,
      name: 'Extranjero (E)',
    },
    {
      value: eDocumentType.RifG,
      name: 'Rif (G)',
    },
    {
      value: eDocumentType.RifJ,
      name: 'Rif (J)',
    },
  ];

  ngOnInit(): void {
    this.fgd.form.patchValue({ [this.controlNameSelect]: this.types[0].value });
  }
}
