import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
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
export class RolesComponent implements OnInit, OnDestroy {
  @ViewChild(DrawerRoleComponent) drawerRoleComponent: DrawerRoleComponent;

  private authService = inject(AuthService);
  private rolesService = inject(RolesService);
  private modal = inject(NzModalService);
  private notification = inject(NzNotificationService);
  private datePipe = inject(DatePipe);

  private subscriptions: Subscription = new Subscription();
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.isLoading = true;
    const getRolesSub = this.rolesService.getList().subscribe(response => {
      this.roles = response;
      this.mapRoles();
    });

    this.subscriptions.add(getRolesSub);
  }

  private mapRoles() {
    this.rolesDataTable = this.roles.map(r => ({
      createdAt: this.datePipe.transform(r.createdAt, 'dd/MM/yyyy')!.toString(),
      key: r.id || '',
      name: r.name,
      users: r.users,
    }));

    this.isLoading = false;
  }

  public handleOpenDrawer() {
    this.openDrawer = true;
  }

  public handleCloseDrawer() {
    this.drawerRoleComponent.resetDrawer();
    this.openDrawer = false;
    this.isSubmitting = false;
    this.selected = undefined;
  }

  public async handleSubmit(role: IRoleCreate | IRoleUpdate) {
    this.isSubmitting = true;

    const authToken = await this.authService.getIdTokenResult();

    const newRequestRole: IRoleRequest = {
      role,
      authToken,
    };

    if (this.selected) {
      this.update(newRequestRole, this.selected.id);
    } else {
      this.create(newRequestRole);
    }
  }

  private update(roleRequest: IRoleRequest, roleId: string) {
    this.rolesService.update(roleId, roleRequest).subscribe({
      next: () => {
        this.handleCloseDrawer();
        this.notification.success('Actualizar rol', 'Se ha actualizado satisfactoriamente');
      },
      error: err => {
        if (err.status > 0) {
          this.notification.error(`Error ${err.status}`, err.error);
          this.isSubmitting = false;
        }
      },
    });
  }

  private create(roleRequest: IRoleRequest) {
    this.rolesService.create(roleRequest).subscribe({
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

  private async delete(id: string) {
    this.isLoading = true;
    this.selected = undefined;
    this.drawerRoleComponent.resetDrawer();
    const authToken = await this.authService.getIdTokenResult();
    this.rolesService.delete(id, authToken).subscribe({
      next: () => {
        this.isLoading = false;
        this.notification.success('Eliminar rol', 'Se ha eliminado satisfactoriamente');
      },
      error: err => {
        if (err.status > 0) {
          this.notification.error(`Error ${err.status}`, err.error);
          this.isLoading = false;
        }
      },
    });
  }

  public handleAction({ id, action }: IActionResponse) {
    this.selected = this.roles.find(r => r.id === id);

    if (action === eActions.Delete && this.selected) {
      this.modal.confirm({
        nzTitle: 'Eliminar rol',
        nzContent: `¿Estás seguro que quieres eliminar el rol "${this.selected.name}"?`,
        nzOkText: 'Sí, eliminar',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.delete(id),
        nzCancelText: 'No, cancelar',
      });
    }

    if (action === eActions.Update) {
      this.handleOpenDrawer();
    }
  }
}
