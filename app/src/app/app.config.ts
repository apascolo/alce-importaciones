import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import {
  connectFunctionsEmulator,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';
import {
  connectStorageEmulator,
  getStorage,
  provideStorage,
} from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNzI18n(es_ES),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase))
    ),
    importProvidersFrom(
      provideAuth(() => {
        if (environment.useEmulators) {
          const fireauth = getAuth();
          connectAuthEmulator(fireauth, 'http://localhost:9099');
          return fireauth;
        } else {
          return getAuth();
        }
      })
    ),
    importProvidersFrom(
      provideFirestore(() => {
        if (environment.useEmulators) {
          const firestore = getFirestore();
          connectFirestoreEmulator(firestore, 'localhost', 8088);
          return firestore;
        } else {
          return getFirestore();
        }
      })
    ),
    importProvidersFrom(
      provideFunctions(() => {
        if (environment.useEmulators) {
          const functions = getFunctions();
          connectFunctionsEmulator(functions, 'http://localhost', 5001);
          return functions;
        } else {
          return getFunctions();
        }
      })
    ),
    importProvidersFrom(
      provideStorage(() => {
        if (environment.useEmulators) {
          const storage = getStorage();
          connectStorageEmulator(storage, 'http://localhost', 9199);
          return storage;
        } else {
          return getStorage();
        }
      })
    ),
  ],
};
