import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
  declarations: [
    ProductItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductItemComponent
  ]
})
export class ComponentsModule { }
