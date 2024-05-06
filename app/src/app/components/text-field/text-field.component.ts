import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
  inject,
} from '@angular/core';
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent {
  @Input({ transform: booleanAttribute }) hasError = false;
  @Input() label = 'Label';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder: string;
  @Input({ required: true }) controlName = 'label';
  @Input() minlength: string;
  @Input() maxlength: string;
  @Input() classes: string;

  public fgd = inject(FormGroupDirective);
}
