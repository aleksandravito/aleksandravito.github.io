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

    let compareDate = function (emp1: Auction, emp2: Auction) {
      let emp1Date = new Date(emp1.prod_date).getTime();
      let emp2Date = new Date(emp2.prod_date).getTime();
      return emp1Date > emp2Date ? 1 : -1;
    };
    let sortedArray = this.auctionlist.sort(compareDate);

  }

  public deleteAuction(auction: Auction): void {

    const lista = this.auctionlist;
    const indexOfAuction = this.storage.findItemIndex(auction);
    lista.splice(indexOfAuction, 1);
    localStorage.setItem('auction_list', JSON.stringify(lista));

  }

  hideDeleteButton(seller: string): boolean {
    return this.user.firstName !== seller;
  }
}
