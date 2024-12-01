import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { updateTotalDb } from '../../utils/updateTotalDb';
import { db, functions } from '../../config/environment';
import { TotalDB } from '../../types/TotalDb';
import { ePermissions, eCollentions, eTotalsDb } from '../../enums/index';
import { IRoleCreate, IRoleRequest, IRoleUpdate } from '../../interfaces/index';

const createRole = async (req: Request, res: Response) => {
  interface Props {
    role: IRoleRequest;
  }

  const { role } = req.body as Props;
  const { name, permissions } = role;

  const nameTrim = name && name.trim();
  const nameLowercase = nameTrim.toLowerCase();
  const allValidRoles = permissions.every((rol) => Object.values(ePermissions).includes(rol));

  if (!nameTrim || !nameTrim.length) {
    return res.status(400).send(`El nombre del rol es obligatorio`);
  }

  if (!allValidRoles) {
    return res.status(400).send(`Lo siento, el rol tiene permisos no establecidos en el sistema`);
  }

  if (!permissions.length) {
    return res.status(400).send(`El rol debe tener permisos agregados`);
  }

  try {
    const newRole: IRoleCreate = {
      name: nameTrim,
      nameLowercase,
      createdAt: Date.now(),
      permissions,
      users: 0,
    };

    const rolExists = await db.collection(eCollentions.Roles).where('nameLowercase', '==', nameLowercase).get();

    if (!rolExists.empty) {
      return res.status(409).send(`Lo siento, ya existe un rol con este nombre`);
    }

    const response = await db.collection(eCollentions.Roles).add(newRole);

    return res.status(201).send({ ...newRole, id: response.id });
  } catch (error) {
    console.log(error);
    return res.status(500).send(handleError(error));
  }
};

const updateRole = async (req: Request, res: Response) => {
  interface Props {
    role: IRoleRequest;
  }

  const { id } = req.params;
  const { role } = req.body as Props;
  const { name, permissions } = role;

  const nameTrim = name && name.trim();
  const nameLowercase = nameTrim.toLowerCase();
  const allValidRoles = permissions.every((rol) => Object.values(ePermissions).includes(rol));

  if (!id || !id.trim().length) {
    return res.status(400).send('Lo siento, no hemos recibido el id del registro a actualizar');
  }

  if (!nameTrim || !nameTrim.length) {
    return res.status(400).send(`El nombre del rol es obligatorio`);
  }

  if (!allValidRoles) {
    return res.status(400).send(`Lo siento, el rol tiene permisos no establecidos en el sistema`);
  }

  if (!permissions.length) {
    return res.status(400).send(`El rol debe tener permisos agregados`);
  }

  try {
    const roleExists = await db.collection(eCollentions.Roles).where('nameLowercase', '==', nameLowercase).get();

    if (!roleExists.empty && id !== roleExists.docs[0].id) {
      return res.status(409).send(`Lo siento, ya existe un rol con este nombre`);
    }

    const newRole: IRoleUpdate = {
      name: nameTrim,
      nameLowercase,
      modifiedAt: Date.now(),
      permissions,
    };

    await db
      .collection(eCollentions.Roles)
      .doc(id)
      .update({ ...newRole });

    return res.send({ ...newRole, id });
  } catch (error) {
    console.log(error);
    return res.status(500).send(handleError(error));
  }
};

const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !id.trim().length) {
    return res.status(400).send('Lo siento, no hemos recibido el id del registro a eliminar');
  }

  try {
    await db.collection(eCollentions.Roles).doc(id).delete();

    // ! actualizar todos los usuarios con este rol, colocar permissions en vacio y usuario pausado

    return res.status(204);
  } catch (error) {
    console.log(error);
    return res.status(500).send(handleError(error));
  }
};

const roleCreated = functions.firestore.document(`${eCollentions.Roles}/{roleId}`).onCreate(async () => {
  try {
    const data = {
      [eTotalsDb.totalRoles]: 1,
    } as TotalDB;

    return await updateTotalDb(data);
  } catch (error) {
    return console.log(handleError(error));
  }
});

const roleDeleted = functions.firestore.document(`${eCollentions.Roles}/{roleId}`).onDelete(async () => {
  try {
    const data = {
      [eTotalsDb.totalRoles]: -1,
    } as TotalDB;

    return await updateTotalDb(data);
  } catch (error) {
    return console.log(handleError(error));
  }
});

export { createRole, updateRole, deleteRole, roleCreated, roleDeleted };
