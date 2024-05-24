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
import { IEntityColumn } from '@interfaces/entity.interface';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { eActions } from '@enums/actions.enum';
import { IActionResponse } from '@interfaces/action-response.interface';
import { IColumn } from '@interfaces/column.interface';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NzDropDownModule,
    NzIconModule,
  ],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatatableComponent {
  @Input() data: any[] = [];
  @Input() columns: IColumn[] = [];
  @Input({ transform: booleanAttribute }) isLoading = false;
  @Input({ transform: booleanAttribute }) usePagination = false;

  @Output() onAction: EventEmitter<IActionResponse> =
    new EventEmitter<IActionResponse>();

  public listOfCurrentPageData: readonly unknown[] = [];
  public skeletons = [...Array(5).keys()];
  public skeletonsLines = [...Array(10).keys()];
  public eActions = eActions;

  onCurrentPageDataChange(listOfCurrentPageData: readonly unknown[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  public handleAction(id: string, action: eActions) {
    this.onAction.emit({ id, action });
  }
}
