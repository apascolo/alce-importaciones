import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  booleanAttribute,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

const colorVariantMap = {
  orange: {
    solid:
      'text-white border-2 border-orange-600 hover:border-orange-800 bg-orange-600 hover:bg-orange-800 shadow-sm shadow-gray-400 active:shadow-lg active:shadow-gray-400',
    outline: 'border-2 border-orange-600 hover:border-orange-800',
    clear: 'text-orange-600 hover:bg-slate-200 active:shadow-sm active:shadow-slate-300',
  },
  rose: {
    solid:
      'text-white border-2 border-rose-600 hover:border-rose-800 bg-rose-600 hover:bg-rose-800 shadow-sm shadow-gray-400 active:shadow-lg active:shadow-gray-400',
    outline: 'border-2 border-rose-600 hover:border-rose-800',
    clear: 'text-rose-600 hover:bg-slate-200 active:shadow-sm active:shadow-slate-300',
  },
  green: {
    solid:
      'text-white border-2 border-green-600 hover:border-green-800 bg-green-600 hover:bg-green-800 shadow-sm shadow-gray-400 active:shadow-lg active:shadow-gray-400',
    outline: 'border-2 border-green-600 hover:border-green-800',
    clear: 'text-green-600 hover:bg-slate-200 active:shadow-sm active:shadow-slate-300',
  },
  gray: {
    solid:
      'text-white border-2 border-gray-600 hover:border-gray-800 bg-gray-600 hover:bg-gray-800 shadow-sm shadow-gray-400 active:shadow-lg active:shadow-gray-400',
    outline: 'border-2 border-gray-600 hover:border-gray-800',
    clear: 'text-gray-600 hover:bg-slate-200 active:shadow-sm active:shadow-slate-300',
  },
};

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() name: string = 'My button';
  @Input() type: 'submit' | 'button' | 'menu' | 'reset' = 'submit';
  @Input() variant: 'solid' | 'outline' | 'clear' = 'solid';
  @Input() color: 'orange' | 'rose' | 'green' | 'gray' = 'orange';
  @Input({ transform: booleanAttribute }) isLoading = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();

  public colorClass: string;

  ngOnInit(): void {
    console.log(this.isLoading);
    this.colorClass = colorVariantMap[this.color][this.variant];
  }

  public handleClick() {
    this.onSubmit.emit();
  }
}
