import {Component, OnDestroy, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {CanComponentDeactivate} from '../../can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  subscriptionsEdit: Subscription;
  changesSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnDestroy(): void {
    this.subscriptionsEdit.unsubscribe();
  }

  ngOnInit() {
    // on peut utiliser ces deux snapshopt sauf que c'est setter uniquement pendant la creation du component,
    // si on veut quelques chose de dynamique voir obserbable
    // console.log(this.route.snapshot.params['id']);
    /*   console.log(this.route.snapshot.queryParams);
        console.log("dff =" +this.route.snapshot.fragment);*/
    // Donc il faut utiliser les subsrciber :
    // this.route.queryParams.subcribe() et this.route.fragment.subcribe

    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.subscriptionsEdit = this.route.params.subscribe(
      (param) => {
        this.server = this.serversService.getServer(+param['id']);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    );

    this.route.queryParams.subscribe(
      (queryParam) => {
        this.allowEdit = +queryParam['allowEdit'] === 1;
      }
    );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // Methode qui sera exécuté quand on essaye de quitter cette route alors qu'on a modifier le champ edit sans sauvegarder ou updater
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes ?');
    }
    return true;
  }

  /*  reload() {
      this.router.navigate(['/servers', 1, 'edit'], {relativeTo: this.route});
    }*/
}
