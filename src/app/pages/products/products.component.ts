import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-products',
    imports: [CommonModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {}
