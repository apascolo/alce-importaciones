import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
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
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NzDropDownModule,
    NzIconModule,
    NzSpinModule,
  ],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatatableComponent {
  @ViewChild('table') table: ElementRef;
  @Input() data: any[] = [];
  @Input() columns: IColumn[] = [];
  @Input({ transform: booleanAttribute }) isLoading = false;
  @Input({ transform: booleanAttribute }) usePagination = false;
  @Input({ transform: booleanAttribute }) isLoadingInfiniteScroll = false;

  @Output() onAction = new EventEmitter<IActionResponse>();
  @Output() onScroll = new EventEmitter<void>();

  @HostListener('scroll', ['$event'])
  handleScroll() {
    console.log('dasds');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight =
      document.documentElement.scrollHeight ?? document.body.scrollHeight;
    if (scrollPosition + windowHeight >= documentHeight) {
      this.onScroll.emit();
    }
  }

  public listOfCurrentPageData: readonly unknown[] = [];
  public skeletons = [...Array(5).keys()];
  public skeletonsLines = [...Array(10).keys()];
  public eActions = eActions;

  public onCurrentPageDataChange(
    listOfCurrentPageData: readonly unknown[]
  ): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  public handleAction(id: string, action: eActions) {
    this.onAction.emit({ id, action });
  }

  public onTableScroll(event: Event): void {
    const tabla = event.target as HTMLElement;
    const alturaTotal = tabla.scrollHeight;
    const alturaVisible = tabla.offsetHeight;

    if (tabla.scrollTop + alturaVisible >= alturaTotal) {
      this.onScroll.emit();
    }
  }
}
