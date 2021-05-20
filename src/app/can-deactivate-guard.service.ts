import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivatedGuard implements CanDeactivate<CanComponentDeactivate> {

  /**
   * C'est la methode qui va etre appelé par angular touter quand il va essayer de quitter la route actuelle */
  canDeactivate(component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return component.canDeactivate(); // donc il va etre implementé et sera appelé à chaque changement de la route possedant canDeactivate sur app.rouitng.module.ts
  }

}
