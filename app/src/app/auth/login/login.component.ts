import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '@components/button/button.component';
import { TextFieldComponent } from '@components/text-field/text-field.component';
import { eRoutes } from '@enums/index';
import { ILogin, ILoginControls } from '@interfaces/index';
import { AuthService } from '@services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonComponent,
    TextFieldComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private message = inject(NzMessageService);
  private router = inject(Router);

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

    const { email, password } = this.form.value as ILogin;

    this.authService
      .login({ email, password })
      .then(() => {
        this.isLoading = false;
        this.router.navigateByUrl(eRoutes.Root);
      })
      .catch((err: any) => {
        this.message.error(err.message);
        this.isLoading = false;
      });
  }
}
