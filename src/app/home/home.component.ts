import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  // acceder à des routes depuis le typescript , avec la view c'est routerLink
  onLoadServer() {
    // complex calculation
    // Navigation programmatically
    this.router.navigate(['/servers']); // il faut donner l absolue path chapitre 132;
  }
}
