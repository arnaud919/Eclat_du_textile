/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptor/auth.interceptor';
import { provideRouter } from '@angular/router';
import { appRouterProviders, routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig, 
  providers: [
    appRouterProviders,
    ...appConfig.providers, 
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),provideRouter(routes)
  ]
}).catch((err) => console.error(err));