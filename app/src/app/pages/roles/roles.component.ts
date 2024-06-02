import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';
import { DatatableComponent } from '@components/datatable/datatable.component';
import { eActions } from '@enums/actions.enum';
import { IActionResponse } from '@interfaces/action-response.interface';
import { IColumn } from '@interfaces/column.interface';
import { IRole, IRoleColumn, IRoleCreate, IRoleRequest, IRoleUpdate } from '@interfaces/role.interface';
import { AuthService } from '@services/auth.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { DrawerRoleComponent } from './components/drawer-role/drawer-role.component';
import { RolesService } from '@services/roles.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    DatatableComponent,
    NzModalModule,
    ReactiveFormsModule,
    FormsModule,
    DrawerRoleComponent,
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RolesComponent implements OnInit {
  private authService = inject(AuthService);
  private rolesService = inject(RolesService);
  private modal = inject(NzModalService);
  private notification = inject(NzNotificationService);
  private datePipe = inject(DatePipe);

  private subscriptions: Subscription;
  private roles: IRole[] = [];

  public isLoading = true;
  public selected?: IRole;
  public openDrawer = false;
  public isSubmitting = false;
  public rolesDataTable: IRoleColumn[] = [];
  public columns: IColumn[] = [
    {
      name: 'Creado el',
      key: 'createdAt',
      width: '200px',
    },
    {
      name: 'Nombre',
      key: 'name',
      width: null,
    },
    {
      name: 'Usuarios',
      key: 'users',
      width: '50px',
    },
    {
      name: 'Acciones',
      key: 'actions',
      width: '50px',
    },
  ];

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.isLoading = true;
    this.rolesService.getList().subscribe(response => {
      this.roles = response;
      this.mapRoles();
    });
  }

  private mapRoles() {
    this.rolesDataTable = this.roles.map(r => ({
      createdAt: this.datePipe.transform(r.createdAt, 'dd/MM/yyyy')!.toString(),
      key: r.objectID || '',
      name: r.name,
      users: r.users,
    }));

    this.isLoading = false;
  }

  public handleOpenDrawer() {
    this.openDrawer = true;
  }

  public handleCloseDrawer() {
    this.isSubmitting = false;
    this.openDrawer = false;
  }

  public async handleSubmit(role: IRoleCreate | IRoleUpdate) {
    this.isSubmitting = true;

    const authToken = await this.authService.getIdTokenResult();

    const newRequestRole: IRoleRequest = {
      role,
      authToken,
    };

    if (this.selected) {
      // update
    } else {
      this.rolesService.create(newRequestRole).subscribe({
        next: () => {
          this.handleCloseDrawer();
          this.notification.success('Crear rol', 'Se ha creado satisfactoriamente');
        },
        error: err => {
          if (err.status > 0) {
            this.notification.error(`Error ${err.status}`, err.error);
            this.isSubmitting = false;
          }
        },
      });
    }
  }

  public handleAction({ id, action }: IActionResponse) {
    if (action === eActions.Delete) {
      this.selected = this.roles.find(e => e.objectID === id);
      if (this.selected) {
        this.modal.confirm({
          nzTitle: 'Eliminar proveedor',
          nzContent: `¿Estás seguro que quieres eliminar a  de tus proveedores?`,
          nzOkText: 'Sí, eliminar',
          nzOkType: 'primary',
          nzOkDanger: true,
          // nzOnOk: () => this.delete(id),
          nzCancelText: 'No, cancelar',
        });
      }
    }

    if (action === eActions.Update) {
      this.selected = this.roles.find(e => e.objectID === id);

      // this.buildForm();
      // this.handleOpen();
      return;
    }
  }
}
