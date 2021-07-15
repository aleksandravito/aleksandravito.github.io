import { Component, OnInit } from '@angular/core';
import { AuctionStorageService } from '../auction-storage.service';
import { Auction } from '../auction';
// @ts-ignore
import { FunksioneAuction } from '../utils/functions';
import { DatePipe } from "@angular/common";

import { User } from '../_models';
import { AccountService } from '../_services';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent extends FunksioneAuction implements OnInit {

  user: User;
  auctionlist!: any;
  constructor(
      public storage: AuctionStorageService,
      private accountService: AccountService,
      private titleService:Title
  ) {
    super();
    this.user = this.accountService.userValue;
    this.titleService.setTitle('Auctions');
  }

  ngOnInit(): void {
    this.auctionlist = this.storage.auctionList;

    var compareDate = function (emp1: Auction, emp2: Auction) {
      var emp1Date = new Date(emp1.prod_date).getTime();
      var emp2Date = new Date(emp2.prod_date).getTime();
      return emp1Date > emp2Date ? 1 : -1;
    }
    var sortedArray = this.auctionlist.sort(compareDate);

    // console.log('auction list', this.auctionlist[0].prod_name);
  }

  // calculateDiff(dateSent: Date) {
  //   const currentDate = new Date();
  //   dateSent = new Date(dateSent);
  //   // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
  //   return Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) / (1000 * 60 * 60 * 24));
  // }

  public deleteAuction(auction: Auction): void {

    const lista = this.auctionlist;
    const indexOfAuction = this.storage.findItemIndex(auction);
    lista.splice(indexOfAuction, 1);
    // localStorage.clear();
    localStorage.setItem('auction_list', JSON.stringify(lista));

  }

  hideDeleteButton(seller: string): boolean {
    console.log('fsheh ->' , this.user.firstName === seller ? true : false )
    return this.user.firstName === seller ? false : true;
  }

  // getWallet(): any {
  //   const user = JSON.parse(localStorage.getItem('user'))['username'];
  //   const localUser = JSON.parse(localStorage.getItem('users_list')).filter((x: { username: string; }) => x.username === user);
  //   return localUser[0]['wallet'];
  // }


}
