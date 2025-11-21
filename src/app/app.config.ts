import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptors/jwt-interceptor-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({ //PARA QUE SE PUEDA DESPLAZAR EL SCROLL CUANDO RETROCEDA DE UNA VENTANA
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })

    ),
    provideHttpClient(
    withInterceptors([jwtInterceptor]),
    ),
  ]
};
