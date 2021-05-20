import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {ServersComponent} from './servers/servers.component';
import {ServerComponent} from './servers/server/server.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './auth-guard';
import {CanDeactivatedGuard} from './can-deactivate-guard.service';

/**
 * On creer notre route avec un constant appRoutes ,
 *
 * app.module est le meilleur endroit pour informer angular des routes de notre application
 */
const appRoutes: Routes = [
  {path: '', component: HomeComponent},  /** page d'acceuil  */
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]
  },
  // canActivate (controler l'acces au routes) : permet d'appliquer un AuthGuard (tant que loggin n'est pas à true on ne pas acceder au route servers et ses children routes) à une route
  // et ses enfants aussi, mais si tu appliquer le guard uniquement sur les routes enfant utilise canActivateChild

  {
    path: 'servers',
    component: ServersComponent,
    canActivateChild: [AuthGuard],
    // canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: ServerComponent
      },
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivatedGuard]} // canDeactivate est executé par angular quand on va changer ou quitter cette route
    ]
  },
  // **  veut dire cache tous les paths non connus et envoie le sur le component Page not found
  // le ** il faut tjrs le metccalcal,btre à la fin si tous les paths en dessous ne seront pas pris en compte
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
  // {path: '**', component: PageNotFoundComponent}
  /*
    {path: 'not-found', redirectTo: ''}  // on redirige vers home
  */
  /**
   On peut regrouper sous forme de child routes qui est mieux et il faut ajouter encore de <route-outlet> dans servers.html
   {path: 'servers', component: ServersComponent}, /** c'est comme localhost:4200/servers
   {path: 'servers/:id', component: ServerComponent}
   {path: 'servers/:id/edit', component: EditServerComponent}
   *  */
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
