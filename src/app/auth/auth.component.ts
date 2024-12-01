import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth',
    imports: [RouterOutlet],
    template: `<router-outlet />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {}
