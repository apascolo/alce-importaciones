import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-users',
    imports: [CommonModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {}
