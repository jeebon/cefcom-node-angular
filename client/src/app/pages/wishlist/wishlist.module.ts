import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgbModule
  ]
})
export class WishlistModule { }
