import { Injectable } from '@angular/core';

const storageName = 'auction_list';

@Injectable({
  providedIn: 'root'
})

export class AuctionStorageService {

  auctionList;
  storage = localStorage.getItem(storageName);

  constructor() {
    if (typeof this.storage === 'string') {
      this.auctionList = JSON.parse(this.storage);
    } else {
      this.auctionList = [];
    }
  }

  // get auctions
  get() {
    return this.auctionList;
  }

  // update an auction
  put(item: any, changes: any) {
    Object.assign(this.auctionList[this.findItemIndex(item)], changes);
    return this.update();
  }

  private update() {
    localStorage.setItem(storageName, JSON.stringify(this.auctionList));

    return this.get();
  }

  findItemIndex(item: any) {
    return this.auctionList.indexOf(item);
  }
}
