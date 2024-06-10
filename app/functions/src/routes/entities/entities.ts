import { Request, Response } from 'express';
import { eTotalsDb } from '../../enums/eTotalsDb';
import { eCollentions } from '../../enums/eCollections';
import { eEntityType } from '../../enums/eEntityType';
import { IEntityCreate, IEntity, IEntityUpdate } from '../../interfaces/IEntity';
import { handleError } from '../../utils/handleError';
import { updateTotalDb } from '../../utils/updateTotalDb';
import { INDEX_ALGOLIA, clientAlgolia, db, functions } from '../../config/environment';
import { TotalDB } from '../../types/TotalDb';

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
    return res.status(400).send('Lo siento, no has indicado el tipo de objeto de este registro');
  }

  try {
    const newEntity: IEntityCreate = {
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

    const entityExists = await db
      .collection(eCollentions.Entities)
      .where('type', '==', type)
      .where('identificationDocument', '==', identificationDocumentTrim)
      .get();

    if (!entityExists.empty) {
      return res.status(409).send(`Lo siento, ya existe un ${type} con esta identificación`);
    }

    const response = await db.collection(eCollentions.Entities).add(newEntity);

    return res.status(201).send({ ...newEntity, objectID: response.id });
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
      .where('identificationDocument', '==', identificationDocumentTrim)
      .get();

    if (!entityExists.empty && id !== entityExists.docs[0].id) {
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

    await db
      .collection(eCollentions.Entities)
      .doc(id)
      .update({ ...newEntity });

    return res.send({ ...newEntity, objectID: id });
  } catch (error) {
    console.log(error);
    return res.status(500).send(handleError(error));
  }
};

const deleteEntity = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !id.length) {
    return res.status(400).send('Lo siento, no hemos recibido el id del registro a eliminar');
  }

  try {
    await db.collection(eCollentions.Entities).doc(id).delete();
    return res.status(204);
  } catch (error) {
    console.log(error);
    return res.status(500).send(handleError(error));
  }
};

const entityCreated = functions.firestore
  .document(`${eCollentions.Entities}/{entityId}`)
  .onCreate(async (snap: functions.firestore.QueryDocumentSnapshot) => {
    const entity = snap.data() as IEntity;
    const index = clientAlgolia.initIndex(INDEX_ALGOLIA.entities);
    index.saveObject({ ...entity, objectID: snap.id });

    const data = {} as TotalDB;

    if (entity.type === eEntityType.Customer) data[eTotalsDb.totalCustomers] = 1;
    if (entity.type === eEntityType.Supplier) data[eTotalsDb.totalSuppliers] = 1;

    return await updateTotalDb(data);
  });

const entityUpdated = functions.firestore
  .document(`${eCollentions.Entities}/{entityId}`)
  .onUpdate(async (snap: functions.Change<functions.firestore.QueryDocumentSnapshot>) => {
    const entityUpdated = snap.after.data() as IEntity;
    const index = clientAlgolia.initIndex(INDEX_ALGOLIA.entities);
    return index.saveObject({ ...entityUpdated, objectID: snap.after.id });
  });

const entityDeleted = functions.firestore
  .document(`${eCollentions.Entities}/{entityId}`)
  .onDelete(async (snap: functions.firestore.QueryDocumentSnapshot) => {
    const entity = snap.data() as IEntity;
    const index = clientAlgolia.initIndex(INDEX_ALGOLIA.entities);
    index.deleteObject(snap.id);

    const data = {} as TotalDB;

    if (entity.type === eEntityType.Customer) data[eTotalsDb.totalCustomers] = -1;
    if (entity.type === eEntityType.Supplier) data[eTotalsDb.totalSuppliers] = -1;

    return await updateTotalDb(data);
  });

export { createEntity, updateEntity, entityCreated, entityDeleted, entityUpdated, deleteEntity };
