import { Injectable, inject, signal } from '@angular/core';
import { IUser } from '@interfaces/index';
import {
  Auth,
  onAuthStateChanged,
  getAuth,
  signOut,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = signal<IUser | null>(null);

  private _fireAuth = inject(Auth);

  constructor() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user === null) signOut(getAuth());
    });
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(getAuth(), email, password);
  }
  logout() {
    return signOut(getAuth());
  }
}
