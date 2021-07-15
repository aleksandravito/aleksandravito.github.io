import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuctionListComponent} from './auction-list/auction-list.component';
import {AuctionComponent} from './auction/auction.component';
import {NewAuctionComponent} from './new-auction/new-auction.component';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

// let nameAuction: string;
// if (nameAuction) {
//     nameAuction = this.getAuction()[0]?.prod_name || 'X';
// }

// console.log('auction ', this.getAuction()[0].prod_name );

const routes: Routes = [
    { path: '',
        component: AuctionListComponent,
        canActivate: [AuthGuard],
        loadChildren: usersModule,
        data: {title: 'Auctions'} },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    // { path: 'auctions-list', component: AuctionListComponent },
    { path: 'auction/:id', component: AuctionComponent, canActivate: [AuthGuard]},
    { path: 'new-auction', component: NewAuctionComponent, canActivate: [AuthGuard], data: {title: 'New Auction'} },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
