import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-operations',
    imports: [CommonModule],
    templateUrl: './operations.component.html',
    styleUrl: './operations.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationsComponent {}
