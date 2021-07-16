import { Component, OnInit } from '@angular/core';

import { User } from '../_models';
import { AccountService } from '../_services';

import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  user: User;

  constructor(
      private accountService: AccountService,
      public router: Router,
      private titleService: Title
  ) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
  }

  getName() {

    let title: any;

    switch (this.router.url) {
      case '/':
        title = "Hi " + this.user.firstName + " !" ;
        break;
      default:
        title = 'Home';
        break;
    }

    return title;
  }

  getTitle() {
    return this.titleService.getTitle();
  }

}
