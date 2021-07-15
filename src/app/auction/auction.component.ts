import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuctionStorageService} from '../auction-storage.service';
// import { AuctionListComponent } from '../auction-list/auction-list.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FunksioneAuction} from '../utils/functions';

import {User} from '../_models';
import {AccountService} from '../_services';

import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent extends FunksioneAuction implements OnInit {

  @Input() auc_bid?: number;
  user: User;
  auctionForm!: FormGroup;
  message = this.getAuction()[0].prod_name;

  constructor(
      private routeAuction: ActivatedRoute,
      private storage: AuctionStorageService,
      private accountService: AccountService,
      private titleService:Title
  ) {
    super();
    this.user = this.accountService.userValue;
    this.titleService.setTitle(this.message);
    // this.changeHeader(this.getAuction()[0].prod_name);
  }

  get bid() {
    return this.auctionForm.get('bid')!;
  }

  ngOnInit(): void {

    let walletBuyer: any;
    if ( this.getAuction()[0].prod_buyer !== this.user.firstName ) {
      walletBuyer = this.getWallet();
    }
    else {
      walletBuyer = this.getWallet() + this.getAuction()[0].prod_highest;
    }
    console.log('walletBuyer ', walletBuyer);
    const higherBid = this.getAuction()[0].prod_highest + 1;
    this.auctionForm = new FormGroup({

      bid: new FormControl('', [
        Validators.required,
        Validators.min(higherBid),
        Validators.max(walletBuyer)
      ])
    });

    this.getAuction();

  }

  public getAuction(): any {
    const id = Number(this.routeAuction.snapshot.paramMap.get('id'));
    return this.storage.auctionList.filter((x: { id: number; }) => x.id === id);
  }

  hideBidButton(seller: string): boolean {
    console.log('fsheh ->' , this.user.firstName === seller );
    return this.user.firstName === seller || this.getWallet() === 0;
  }

  save() {

    // ndryshimi i user te loguar
    const users = JSON.parse(localStorage.getItem('users_list'));
    const singleUser: any = users.filter((x: { id: any; }) => x.id === this.user.id);
    const index = users.indexOf(singleUser[0]);
    let updatedBuyer: any;
    if ( this.getAuction()[0].prod_buyer !== this.user.firstName ) {
      updatedBuyer = {
        wallet: ( users[index].wallet - this.auctionForm.value.bid )
      }
      console.log('shyqyr qenke ndryshe');
    }
    else {
     updatedBuyer = {
        wallet: ( this.getWallet() + this.getAuction()[0].prod_highest - this.auctionForm.value.bid )
      }
      console.log('mos qenke njesoj');
    }
    console.log('walletBuyer pas save ', this.getAuction()[0].prod_highest );
    console.log('prodBuyer pas save ', this.auctionForm.value.bid );
    console.log('firstName pas save ', this.user.firstName);
    Object.assign(users[index], updatedBuyer);
    localStorage.setItem('users_list', JSON.stringify(users));


    // ndryshimi i auction
    const updatedAuction = {
      prod_highest: this.auctionForm.value.bid,
      prod_buyer: this.user.firstName
    };
    this.storage.put(this.getAuction()[0], updatedAuction);

    this.auctionForm.reset();
  }

}
