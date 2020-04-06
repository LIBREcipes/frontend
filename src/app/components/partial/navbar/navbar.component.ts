import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  user = {
    uuid: '098908-323409-dfsadlfj',
    username: 'mattydebie',
  }

  userDropdownOptions = [
    {
      icon: 'fa fa-book',
      link: ['/chefs', this.user.uuid, 'recipes'],
      value: 'My Recipes',
    },
    {
      icon: 'fa fa-sign-out',
      link: '/',
      value: 'Sign Out',
    },
  ]

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
