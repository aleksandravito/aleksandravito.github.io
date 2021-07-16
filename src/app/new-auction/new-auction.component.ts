import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { AuctionStorageService } from '../auction-storage.service';
import { AUCTIONS } from '../auctions';
import {Auction} from '../auction';
import { User } from '../_models';
import { AccountService } from '../_services';

import { DatePipe } from '@angular/common';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-new-auction',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.css']
})
export class NewAuctionComponent implements OnInit {

  user: User;

  currentDate = new Date();
  latest_date = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');

  heroForm!: FormGroup;

  auction!: object;

  constructor(
      private storage: AuctionStorageService,
      private accountService: AccountService,
      public datepipe: DatePipe,
      private titleService:Title
  ) {
    this.user = this.accountService.userValue;
    this.titleService.setTitle('New Auction');
  }

  get name() {
    return this.heroForm.get('name')!;
  }

  get description() {
    return this.heroForm.get('description')!;
  }

  get price() {
    return this.heroForm.get('price')!;
  }

  get enddate() {
    return this.heroForm.get('enddate')!;
  }

  ngOnInit(): void {

    this.heroForm = new FormGroup({

      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(11)
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      enddate: new FormControl('', [
        Validators.required
      ])
    });
  }

  public save(heroForm: FormGroup): void {

    let newItem!: Auction[];
    // newItem = AUCTIONS;
    newItem = this.storage.auctionList;
    // localStorage.removeItem('auction_list');

    const addItem: Auction = {
      id: newItem.length ? Math.max(...newItem.map(x => x.id)) + 1 : 1,
      seller: this.user.firstName,
      prod_name: heroForm.value.name,
      prod_desc: heroForm.value.description,
      prod_start: heroForm.value.price,
      prod_highest: heroForm.value.price,
      prod_date: heroForm.value.enddate,
      prod_buyer: ''
    };

    newItem.push(addItem);

    localStorage.setItem('auction_list', JSON.stringify(newItem));

    heroForm.reset();

  }
}
