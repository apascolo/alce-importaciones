import { Injectable, inject, signal } from '@angular/core';
import { ILogin, IUser } from '@interfaces/index';
import {
  Auth,
  signOut,
  signInWithEmailAndPassword,
  authState,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = signal<IUser | null>(null);

  private auth: Auth = inject(Auth);

  getAuthState() {
    return authState(this.auth);
  }
  async getIdTokenResult() {
    try {
      const authToken = await this.auth.currentUser?.getIdTokenResult();
      return authToken ? authToken.token : '';
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  login({ email, password }: ILogin) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
