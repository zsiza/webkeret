import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), ...appConfig.providers, provideFirebaseApp(() => initializeApp({ projectId: "keretrendszerek-da516", appId: "1:1071891705360:web:d38b4614587c53763e6495", storageBucket: "keretrendszerek-da516.firebasestorage.app", apiKey: "AIzaSyDv4imADnikr1RkkfFOlVt89ASN3qX1GSU", authDomain: "keretrendszerek-da516.firebaseapp.com", messagingSenderId: "1071891705360" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
}).catch((err) => console.error(err));
