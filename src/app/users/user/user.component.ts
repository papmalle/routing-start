import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramsSubscription: Subscription;

  /**
   * ActivatedRoute : permet d'acceder au courant route charger
   * par angular pour retirer des informations sur les paramètres de l'url ou paramètre de notre route
   * @param route
   */
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'], /** recupération param de la route*/
      name: this.route.snapshot.params['name']
    };
    /** on fait pour la 1ère fois que le composant est crée par angular, par la suite
     si on change de route à travers la balise <a [routerLink]="['/users', 35,'Anna']">Load Anna (35)</a>
     Angular ne detuit pas et reécreer le component donc les anciennes valeurs de this.route.snapshot.params['id'] reste même en changant de la route
     d'où l'importance d'utiliser juste après la fonction route.params (sans snaphop) pour avoir un object Observable
     qui va souscrire à des évenements et executé derrière une methode
     */
    /** Cet additional code n'est pas necessaire (this.route.snapshot.params['id'] est suffisant)
     * si tu sais que ton composant sera recrer à chaque fois ce qui est le cas à 99 à 100 % comme dans le <a [routerLink]="['/users', 35,'Anna']">Load Anna (35)</a>
     * dans servers component html
     * */
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
    console.log("Init : Param Subcribe");

  }

  ngOnDestroy(): void {
    console.log("Destroy : Param UnSubcribe");
    this.paramsSubscription.unsubscribe();
    /** Quand on fait une soucritption avec l'observable il faut le detruit,
     *  car en changeant la page angular cree et detruit le component à chaque venu et aller de la page
     *
     *
     */
  }

}
