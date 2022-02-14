import { Component, OnInit, Input } from '@angular/core';
import { ProductResponse } from 'src/app/interfaces/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-component-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() item: ProductResponse;
  baseImgUri = `${environment.server_url}/images/product`;
  constructor() { }

  ngOnInit(): void {
  }

  toggleWishlist(id: string) {

  }

}
