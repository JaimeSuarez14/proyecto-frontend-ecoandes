import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '@shared/services/auth-service';

@Directive({
  selector: '[appHasAuth]',
})
export class HasAuth {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private authService = inject(AuthService);
  appHasAuth = input<boolean>();

  constructor() {
    effect(() => {
      const isLoggedIn = !!this.authService.currentUserAuth$() && !!this.authService.getToken();
      const isVer  = this.appHasAuth()
      this.viewContainerRef.clear();
      if ( isLoggedIn === isVer) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
