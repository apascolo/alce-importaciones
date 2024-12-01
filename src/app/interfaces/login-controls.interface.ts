import { FormControl } from '@angular/forms';

export interface ILoginControls {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
