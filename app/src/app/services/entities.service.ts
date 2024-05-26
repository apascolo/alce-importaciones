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
import { eEntityType } from '@enums/entity-type.enum';
import {
  IEntity,
  IEntityCreate,
  IEntityUpdate,
  IGetEntity,
} from '@interfaces/entity.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EntitiesService {
  private http = inject(HttpClient);
  private firestore = inject(Firestore);

  create = (body: { entity: IEntityCreate; authToken: string }) =>
    this.http.post(`${environment.api}/entities`, body);

  update = (id: string, body: { entity: IEntityUpdate; authToken: string }) =>
    this.http.put(`${environment.api}/entities/${id}`, body);

  delete = (id: string, authToken: string) =>
    this.http.delete(`${environment.api}/entities/${id}`, {
      body: { authToken },
    });

  getList = ({
    type,
    deleted = false,
    requestLimit,
    lastRequest,
  }: IGetEntity) => {
    const itemCollection = collection(
      this.firestore,
      'entities'
    ) as CollectionReference<IEntity>;

    let q = query(
      itemCollection,
      where('type', '==', type),
      where('isDeleted', '==', deleted),
      orderBy('createdAt', 'desc')
    );

    if (requestLimit) {
      if (lastRequest) {
        q = query(
          itemCollection,
          where('type', '==', type),
          where('isDeleted', '==', deleted),
          orderBy('createdAt', 'desc'),
          startAfter(lastRequest),
          limit(requestLimit)
        );
      } else {
        q = query(
          itemCollection,
          where('type', '==', type),
          where('isDeleted', '==', deleted),
          orderBy('createdAt', 'desc'),
          limit(requestLimit)
        );
      }
    }

    return collectionData<IEntity>(q, { idField: 'objectID' }) as Observable<
      IEntity[]
    >;
  };
}
