import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './categories.component.html',
    imports: [CommonModule],
    selector: 'app-categories',
    styleUrl: './categories.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {}
