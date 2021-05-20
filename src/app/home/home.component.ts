import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
  }


  ngOnInit() {
  }

  // acceder à des routes depuis le typescript , avec la view c'est routerLink
  onLoadServer() {
    // complex calculation
    // Navigation programmatically
    this.router.navigate(['/servers']); // il faut donner l absolue path chapitre 132;
  }

  onLoadServerOne(id: number) {
    /*  façon promgramatical
      localhost:4200/servers/5/edit?allowEdit=1
        */
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: 5}, fragment: 'loading'}); // il faut donner l absolue
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.login();
    this.router.navigate(['/servers']);

  }
}
