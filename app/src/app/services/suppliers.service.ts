import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  orderBy,
  query,
  where,
  limit,
  startAfter,
} from '@angular/fire/firestore';
import { eEndpoints } from '@enums/endpoints.enum';
import { IEntity, IEntityCreate, IEntityRequest, IEntityUpdate, IGetEntity } from '@interfaces/entity.interface';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private http = inject(HttpClient);
  private firestore = inject(Firestore);

  create = (body: IEntityRequest) => this.http.post<IEntity>(`${environment.api}/${eEndpoints.Suppliers}`, body);

  update = (id: string, body: IEntityRequest) =>
    this.http.put<IEntity>(`${environment.api}/${eEndpoints.Suppliers}/${id}`, body);

  delete = (id: string, authToken: string) =>
    this.http.delete(`${environment.api}/${eEndpoints.Suppliers}/${id}`, {
      body: { authToken },
    });

  getList = ({ type, deleted = false, requestLimit, lastRequest }: IGetEntity) => {
    const itemCollection = collection(this.firestore, 'entities') as CollectionReference<IEntity>;

    let q = query(itemCollection, where('type', '==', type), orderBy('createdAt', 'desc'));

    if (requestLimit) {
      if (lastRequest) {
        q = query(
          itemCollection,
          where('type', '==', type),
          orderBy('createdAt', 'desc'),
          startAfter(lastRequest),
          limit(requestLimit)
        );
      } else {
        q = query(itemCollection, where('type', '==', type), orderBy('createdAt', 'desc'), limit(requestLimit));
      }
    }

    return (collectionData<IEntity>(q, { idField: 'objectID' }) as Observable<IEntity[]>).pipe(
      debounceTime(500),
      distinctUntilChanged()
    );
  };
}
