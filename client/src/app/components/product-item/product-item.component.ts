import { Component, OnInit, Input } from '@angular/core';
import { ProductResponse } from 'src/app/interfaces/product';
import { environment } from 'src/environments/environment';
import { AuthService, ProductService } from 'src/app/services';
import { UserResponseData } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() item: ProductResponse;
  baseImgUri = `${environment.server_url}/images/product`;
  currentUser: UserResponseData;
  constructor(
    private router: Router,
    private authService: AuthService,
    private productService: ProductService
  ) {
    this.authService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  ngOnInit(): void {

  }

  addToWishlist(id: string) {
    if (this.currentUser) {
      this.productService.addWishlist(id).subscribe((res) => {
        alert(res?.message || 'Added');
      }, (err) => {
        alert(err?.message || 'Unable to process');
      })
    } else {
      this.router.navigate(['/login']);
    }
  }

  removeFromWishlist(id: string) {
    if (this.currentUser) {
      this.productService.removeFromWishlist(id).subscribe((res) => {
        alert(res?.message || 'Removed');
      }, (err) => {
        alert(err?.message || 'Unable to process');
      })
    } else {
      this.router.navigate(['/login']);
    }
  }
}

