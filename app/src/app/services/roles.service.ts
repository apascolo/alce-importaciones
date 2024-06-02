import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { eEndpoints } from '@enums/endpoints.enum';
import { IRole, IRoleRequest } from '@interfaces/role.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private http = inject(HttpClient);
  private firestore = inject(Firestore);

  create = (body: IRoleRequest) => this.http.post<IRole>(`${environment.api}/${eEndpoints.Roles}`, body);

  update = (id: string, body: IRoleRequest) =>
    this.http.put<IRole>(`${environment.api}/${eEndpoints.Roles}/${id}`, body);

  delete = (id: string, authToken: string) =>
    this.http.delete(`${environment.api}/${eEndpoints.Roles}/${id}`, {
      body: { authToken },
    });

  getList = () => {
    const itemCollection = collection(this.firestore, 'roles') as CollectionReference<IRole>;
    const q = query(itemCollection, orderBy('createdAt', 'desc'));
    return collectionData<IRole>(q, { idField: 'objectID' }) as Observable<IRole[]>;
  };
}
