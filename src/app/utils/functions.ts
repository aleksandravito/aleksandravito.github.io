import {filter, map} from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { AuctionComponent } from "../auction/auction.component";

export class FunksioneAuction {

    public route: ActivatedRoute;
    public router: Router;
    public auction: AuctionComponent;

    public calculateDiff(dateSent: Date) {
        const currentDate = new Date();
        dateSent = new Date(dateSent);
        // tslint:disable-next-line:max-line-length
        return Math.floor(
            (Date.UTC(dateSent.getFullYear(),
                dateSent.getMonth(),
                dateSent.getDate()) -
                Date.UTC(currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate()) )
            / (1000 * 60 * 60 * 24));
    }

    public getWallet(): any {
        const user = JSON.parse(localStorage.getItem('user'))['username'];
        const localUser = JSON.parse(localStorage.getItem('users_list')).filter((x: { username: string; }) => x.username === user);
        return localUser[0]['wallet'];
    }

}
