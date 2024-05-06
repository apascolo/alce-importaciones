import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginControls } from '@interfaces/index';
import { AuthService } from '@services/auth.service';
import { UserCredential } from 'firebase/auth';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private message = inject(NzMessageService);

  public form: FormGroup<ILoginControls>;
  public isLoading = false;
  public year = new Date().getFullYear();

  constructor() {
    this.buildForm();
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public controlInvalid(control: string) {
    return this.form.get(control)?.invalid && this.form.get(control)?.dirty;
  }

  private buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  public handleSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const { email, password } = this.form.value;

    this.authService
      .login({ email, password })
      .then((user: UserCredential) => {
        this.isLoading = false;
      })
      .catch((err: any) => {
        this.message.error(err.message);
        this.isLoading = false;
      });
  }
}
