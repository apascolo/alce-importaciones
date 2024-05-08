import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
} from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IEntityColumn } from '@interfaces/IEntity';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { eActions } from '@enums/index';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NzSkeletonModule,
    NzDropDownModule,
    NzIconModule,
  ],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatatableComponent {
  @Input() data: IEntityColumn[] = [];
  @Input({ transform: booleanAttribute }) isLoading = false;

  @Output() onUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();

  public skeletons = [...Array(5).keys()];
  public skeletonsLines = [...Array(10).keys()];
  public eActions = eActions;

  public handleSelect(id: string) {
    this.onSelect.emit(id);
  }

  public handleAction(id: string, action: eActions) {
    if (action === eActions.Update) this.onUpdate.emit(id);

    if (action === eActions.Delete) this.onDelete.emit(id);
  }
}
