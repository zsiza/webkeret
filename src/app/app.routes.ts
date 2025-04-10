import { Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { YogaComponent } from './pages/yoga/yoga.component';
import { VideoComponent } from './pages/video/video.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
export const routes: Routes = [
  { path: '', component: MainComponent }, 
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'yoga', component: YogaComponent }, 
  { path: 'video/:id', component: VideoComponent }, 
  { path: 'subscribe', component: SubscribeComponent }, 
  { path: '**', component: MainComponent },
];
