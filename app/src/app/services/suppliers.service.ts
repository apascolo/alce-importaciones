import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEntityCreate } from '@interfaces/IEntity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private http = inject(HttpClient);

  create = (body: IEntityCreate) =>
    this.http.post(`${environment.api}/entities`, body);
}
