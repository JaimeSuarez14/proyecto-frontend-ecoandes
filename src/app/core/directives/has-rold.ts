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
  selector: '[appHasRold]',
})
export class HasRold {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private authService = inject(AuthService);

  appHasRold = input.required<string>();

  constructor() {
    effect(() => {
      const currentResponse = this.authService.currentUserAuth$();
      this.viewContainerRef.clear();
      if (currentResponse && this.authService.hasRole(this.appHasRold())) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
