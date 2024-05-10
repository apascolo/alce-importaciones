import { Request, Response } from 'express';
import { TOTALSDB } from 'src/constants';
import { eEntityType, eCollentions } from 'src/enums';
import { IEntityCreate, IEntity, IFullAudited, IEntityUpdate } from 'src/interfaces';
import { TotalDB } from 'src/types/TotalDb';
import { handleError, updateTotalDb } from 'src/utils';
import { INDEX_ALGOLIA, clientAlgolia, db, functions } from 'src/config/environment';

const createEntity = async (req: Request, res: Response) => {
  interface Props {
    entity: IEntityCreate;
  }

  const { entity } = req.body as Props;
  const { name, lastName, businessName, identificationDocument, notes, phone, email, address, type } = entity;

  const emailTrim = email && email.trim();
  const nameTrim = name && name.trim();
  const lastNameTrim = lastName && lastName.trim();
  const businessNameTrim = businessName && businessName.trim();
  const identificationDocumentTrim = identificationDocument && identificationDocument.trim();
  const addressTrim = address && address.trim();

  if (!nameTrim || !nameTrim.length) {
    return res.status(400).send(`El nombre del ${type} es obligatorio`);
  }
  if (!lastNameTrim || !lastNameTrim.length) {
    return res.status(400).send(`El apellido del ${type} es obligatorio`);
  }
  if (type === eEntityType.Supplier && (!businessNameTrim || !businessNameTrim.length)) {
    return res.status(400).send(`El nombre de la empresa del ${type} es obligatoria`);
  }
  if (!identificationDocumentTrim || !identificationDocumentTrim.length) {
    return res.status(400).send(`La identificación del ${type} es obligatoria`);
  }
  if (!emailTrim || !emailTrim.length) {
    return res.status(400).send(`El correo del ${type} es obligatorio`);
  }
  if (type === eEntityType.Supplier && (!addressTrim || !addressTrim.length)) {
    return res.status(400).send(`La dirección del ${type} es obligatoria`);
  }
  if (!type || !type.length || (type !== eEntityType.Customer && type !== eEntityType.Supplier)) {
    return res.status(400).send('Lo siento, no has indicato el tipo de objeto de este registro');
  }

  try {
    const entityExists = await db
      .collection(eCollentions.Entities)
      .where('type', '==', type)
      .where('identificationDocument', '==', identificationDocument)
      .get();

    const entityRef = entityExists.docs[0].ref;
    const isDeleted = (entityExists.docs[0].data() as IEntity).isDeleted;

    if (!entityExists.empty && !isDeleted) {
      return res.status(409).send(`Lo siento, ya existe un ${type} con esta identificación`);
    }

    const newEntity: Omit<IEntity, 'id'> = {
      name: nameTrim,
      lastName: lastNameTrim,
      businessName: businessNameTrim ?? null,
      identificationDocument: identificationDocumentTrim,
      notes: notes ?? null,
      phone: phone && phone.length ? phone.trim() : null,
      email: email.trim(),
      address: addressTrim ?? null,
      type,
      createdAt: Date.now(),
    };

    if (!entityExists.empty && isDeleted) {
      const dataDelete: IFullAudited = {
        isDeleted: false,
        deletedAt: null,
        deleterId: null,
      };

      await entityRef.update({ ...newEntity, ...dataDelete });

      return res.status(201).send({ ...newEntity, id: entityRef.id, objectID: entityRef.id });
    }

    const response = await db.collection(eCollentions.Entities).add(newEntity);

    return res.status(201).send({ ...newEntity, id: response.id, objectID: response.id });
  } catch (error) {
    console.log(error);
    return res.status(500).send(handleError(error));
  }
};

const updateEntity = async (req: Request, res: Response) => {
  interface Props {
    entity: IEntityUpdate;
  }

  const { id } = req.params;
  const { entity } = req.body as Props;
  const { name, lastName, businessName, identificationDocument, notes, phone, email, address, type } = entity;

  const emailTrim = email && email.trim();
  const nameTrim = name && name.trim();
  const lastNameTrim = lastName && lastName.trim();
  const businessNameTrim = businessName && businessName.trim();
  const identificationDocumentTrim = identificationDocument && identificationDocument.trim();
  const addressTrim = address && address.trim();

  if (!nameTrim || !nameTrim.length) {
    return res.status(400).send(`El nombre del ${type} es obligatorio`);
  }
  if (!lastNameTrim || !lastNameTrim.length) {
    return res.status(400).send(`El apellido del ${type} es obligatorio`);
  }
  if (type === eEntityType.Supplier && (!businessNameTrim || !businessNameTrim.length)) {
    return res.status(400).send(`El nombre de la empresa del ${type} es obligatoria`);
  }
  if (!identificationDocumentTrim || !identificationDocumentTrim.length) {
    return res.status(400).send(`La identificación del ${type} es obligatoria`);
  }
  if (!emailTrim || !emailTrim.length) {
    return res.status(400).send(`El correo del ${type} es obligatorio`);
  }
  if (type === eEntityType.Supplier && (!addressTrim || !addressTrim.length)) {
    return res.status(400).send(`La dirección del ${type} es obligatoria`);
  }
  if (!type || !type.trim().length || (type !== eEntityType.Customer && type !== eEntityType.Supplier)) {
    return res.status(400).send('Lo siento, no has indicato el tipo de objeto de este registro');
  }
  if (!id || !id.trim().length) {
    return res.status(400).send('Lo siento, no hemos recibido el id del registro a actualizar');
  }

  try {
    const entityExists = await db
      .collection(eCollentions.Entities)
      .where('type', '==', type)
      .where('identificationDocument', '==', identificationDocument)
      .get();

    if (!entityExists.empty) {
      return res.status(409).send(`Lo siento, ya existe un ${type} con esta identificación`);
    }

    const newEntity: IEntityUpdate = {
      name: nameTrim,
      lastName: lastNameTrim,
      businessName: businessNameTrim ?? null,
      identificationDocument: identificationDocumentTrim,
      notes: notes ?? null,
      phone: phone && phone.length ? phone.trim() : null,
      email: email.trim(),
      address: addressTrim ?? null,
      type,
      modifiedAt: Date.now(),
    };

    const entityRef = db.collection(eCollentions.Entities).doc(id);
    await entityRef.update({ ...newEntity });

    return res.send({ ...newEntity, id, objectID: id });
  } catch (error) {
    console.log(error);
    return res.status(500).send(handleError(error));
  }
};

const softDeleteEntity = async (req: Request, res: Response) => {
  interface Props {
    userId: string;
  }

  const { id } = req.params;
  const { userId } = req.body as Props;

  if (!id || !id.trim().length) {
    return res.status(400).send('Lo siento, no hemos recibido el id del registro a actualizar');
  }

  try {
    const entityRef = db.collection(eCollentions.Entities).doc(id);

    const dataDelete: IFullAudited = {
      deletedAt: Date.now(),
      isDeleted: true,
      deleterId: userId,
    };

    await entityRef.update({ ...dataDelete });

    return res.status(204);
  } catch (error) {
    console.log(error);
    return res.status(500).send(handleError(error));
  }
};

const entityCreated = functions.firestore
  .document(`${eCollentions.Entities}/{entityId}`)
  .onCreate(async (snap: any) => {
    const entity = snap.data() as IEntity;
    const index = clientAlgolia.initIndex(INDEX_ALGOLIA.entities);
    index.saveObject({ ...entity, objectID: snap.id });

    const data = {} as TotalDB;

    if (entity.type === eEntityType.Customer) data[TOTALSDB.totalCustomers] = 1;
    if (entity.type === eEntityType.Supplier) data[TOTALSDB.totalSuppliers] = 1;

    return await updateTotalDb(data);
  });

const entityDeleted = functions.firestore
  .document(`${eCollentions.Entities}/{entityId}`)
  .onDelete(async (snap: any) => {
    const entity = snap.data() as IEntity;
    const index = clientAlgolia.initIndex(INDEX_ALGOLIA.entities);
    index.deleteObject(snap.id);

    const data = {} as TotalDB;

    if (entity.type === eEntityType.Customer) data[TOTALSDB.totalCustomers] = -1;
    if (entity.type === eEntityType.Supplier) data[TOTALSDB.totalSuppliers] = -1;

    return await updateTotalDb(data);
  });

export { createEntity, updateEntity, softDeleteEntity, entityCreated, entityDeleted };
