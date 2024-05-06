import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
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
import { environment } from '../environments/environment';
import { UsersComponent } from '@pages/users/users.component';
import { ProductsComponent } from '@pages/products/products.component';
import { OperationsComponent } from '@pages/operations/operations.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { CategoriesComponent } from '@pages/categories/categories.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProductsComponent,
    OperationsComponent,
    DashboardComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      if (environment.useEmulators) {
        const fireauth = getAuth();
        connectAuthEmulator(fireauth, 'http://localhost:9099');
        return fireauth;
      } else {
        return getAuth();
      }
    }),
    provideFirestore(() => {
      if (environment.useEmulators) {
        const firestore = getFirestore();
        connectFirestoreEmulator(firestore, 'localhost', 8088);
        return firestore;
      } else {
        return getFirestore();
      }
    }),
    provideFunctions(() => {
      if (environment.useEmulators) {
        const functions = getFunctions();
        connectFunctionsEmulator(functions, 'http://localhost', 5001);
        return functions;
      } else {
        return getFunctions();
      }
    }),
    provideStorage(() => {
      if (environment.useEmulators) {
        const storage = getStorage();
        connectStorageEmulator(storage, 'http://localhost', 9199);
        return storage;
      } else {
        return getStorage();
      }
    }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
