import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit() {
    const id = +this.route.snapshot.params['id']; // param encoie tjr un string donc + pour integer
    this.server = this.serversService.getServer(id);
    /** Imagine dans le html du meme component ici serverComponent on fait un bouton avec le même url
     * le composant ne sera pas recreer et la methode Init ne sera pas rappeler encore vu qu'on est déjà
     * dans le même component d ou l avantage des obserbable et on soucrit ,n 'oublie pas la methode  destroy et
     * unbscribe le obervable
     * */
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
  }

  onEdit() {
    // this.router.navigate(['/servers', this.server.id, 'edit']);
    // comme nous sommes sur le mêmechemin on peut faire juste :
    // zt relativeTo : this.route pour dire à angular la route actuellle maintenant angular/route sait la route actuelle où on
    // veut naviguer relativement
    // queryParamsHandling: 'preserve' permet de garger les informations queryParam comme ?allow = 1 lorsqu'on navigue entre les differents cheminil ya aussi comme valeur 'merge'
    this.router.navigate(['edit'], {relativeTo : this.route, queryParamsHandling: 'preserve'} );
  }
}
