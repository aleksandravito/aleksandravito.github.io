import { Component, OnInit } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { FunksioneAuction } from './utils/functions';
import {AuctionStorageService} from "./auction-storage.service";

import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({ selector: 'app', templateUrl: 'app.component.html' })

export class AppComponent extends FunksioneAuction implements OnInit{

    subscription: Subscription;
    intervalId: number;

    user: User;

    constructor(
        private accountService: AccountService,
        public storage: AuctionStorageService,
        public router: Router
    ) {
        super();
        this.accountService.user.subscribe(x => this.user = x);
    }

    ngOnInit() {

        const source = interval(10000);
        this.subscription = source.subscribe(val => this.controlAuctions());

    }

    controlAuctions() {
        const arrayAuction = this.storage.auctionList;
        for (let i = 0; i < arrayAuction.length; i++) {
            const dateAuction = this.calculateDiff(arrayAuction[i].prod_date);
            if (dateAuction < 0) {

                // shtohet ne wallet e seller bid me i madh
                const users = JSON.parse(localStorage.getItem('users_list'));
                const singleUser: any = users.filter((x: { firstName: any; }) => x.firstName === arrayAuction[i].seller);
                const index = users.indexOf(singleUser[0]);
                const updatedBuyer = {
                    wallet: (users[index].wallet + arrayAuction[i].prod_highest)
                }
                Object.assign(users[index], updatedBuyer);
                localStorage.setItem('users_list', JSON.stringify(users));
                console.log('shtimi ', users);

                // fshihet auction me end_date me te madhe se 0
                const lista = arrayAuction;
                lista.splice(i, 1);
                localStorage.setItem('auction_list', JSON.stringify(lista));
            }
        }
    }

    ngOnDestroy() {

        this.subscription && this.subscription.unsubscribe();

    }

}
