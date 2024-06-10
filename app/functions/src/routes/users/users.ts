import { Request, Response } from 'express';
import { db, functions } from '../../config/environment';
import { eCollentions, eTotalsDb } from '../../enums';
import { IUserCreate, IUserUpdate } from '../../interfaces';
import { TotalDB } from '../../types';
import { handleError, updateTotalDb } from '../../utils';

const createUser = async (req: Request, res: Response) => {
  interface Props {
    user: IUserCreate;
  }

  const { user } = req.body as Props;
  const { name, lastName, email } = user;

  const nameTrim = name.trim();
  const emailTrim = email.trim();
  const lastNameTrim = lastName.trim();

  if (!nameTrim) {
    return res.status(400).send('Lo siento, debes asignar un nombre al usuario');
  }

  if (!lastNameTrim) {
    return res.status(400).send('Lo siento, debes asignar un apellido al usuario');
  }

  if (!emailTrim) {
    return res.status(400).send('Lo siento, debes asignar un email al usuario');
  }

  try {
    const newUser: IUserCreate = {
      ...user,
      createdAt: Date.now(),
      sales: 0,
    };

    const response = await db.collection(eCollentions.Users).add(newUser);

    return res.status(201).send({ ...newUser, id: response.id });
  } catch (error) {
    console.log(error);
    return res.status(500).send(handleError(error));
  }
};

const updateUser = async (req: Request, res: Response) => {
  interface Props {
    user: IUserUpdate;
  }

  const { user } = req.body as Props;
  const { id } = req.params;
  const { name, lastName, email } = user;

  const nameTrim = name.trim();
  const emailTrim = email.trim();
  const lastNameTrim = lastName.trim();

  if (!id || !id.trim()) {
    return res.status(400).send('Lo siento, no hemos recibido el id del usuario a actualizar');
  }

  if (!nameTrim) {
    return res.status(400).send('Lo siento, debes asignar un nombre al usuario');
  }

  if (!lastNameTrim) {
    return res.status(400).send('Lo siento, debes asignar un apellido al usuario');
  }

  if (!emailTrim) {
    return res.status(400).send('Lo siento, debes asignar un email al usuario');
  }

  try {
    const userToUpdate: IUserUpdate = {
      ...user,
      modifiedAt: Date.now(),
    };

    const userRef = db.collection(eCollentions.Users).doc(id);

    if (!userRef) {
      return res.status(404).send('Lo siento, no hemos encontrado a este usuario para actualizarlo');
    }

    await userRef.update({ ...userToUpdate });

    return res.send({ ...userToUpdate, id });
  } catch (error) {
    console.log(error);
    return res.status(500).send(handleError(error));
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !id.trim().length) {
    return res.status(400).send('Lo siento, no hemos recibido el id del usuario a eliminar');
  }

  try {
    await db.collection(eCollentions.Users).doc(id).delete();

    return res.status(204);
  } catch (error) {
    console.log(error);
    return res.status(500).send(handleError(error));
  }
};

const userCreated = functions.firestore.document(`${eCollentions.Users}/{userId}`).onCreate(async () => {
  try {
    const data = {
      [eTotalsDb.totalUsers]: 1,
    } as TotalDB;

    return await updateTotalDb(data);
  } catch (error) {
    return console.log(handleError(error));
  }
});

const userDeleted = functions.firestore.document(`${eCollentions.Users}/{userId}`).onDelete(async () => {
  try {
    const data = {
      [eTotalsDb.totalUsers]: -1,
    } as TotalDB;

    return await updateTotalDb(data);
  } catch (error) {
    return console.log(handleError(error));
  }
});

export { createUser, updateUser, deleteUser, userCreated, userDeleted };
