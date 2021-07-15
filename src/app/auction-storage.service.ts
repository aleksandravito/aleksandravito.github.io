import { Injectable } from '@angular/core';
// import { AUCTIONS }
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
      console.log('tamam storage', this.auctionList);
    } else {
      this.auctionList = [];
      console.dir('jo tamam', this.auctionList);
    }
  }

  // get heroes
  get() {
    return this.auctionList;
  }

  // update an hero
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
