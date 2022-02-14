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
    this.authService.currentUser.subscribe(x => { console.log('x', x); this.currentUser = x; });
  }

  ngOnInit(): void {

  }

  toggleWishlist(id: string) {
    if (this.currentUser) {
      this.productService.addWishlist(id).subscribe((res) => {
        alert(res?.message || 'Success');
      }, (err) => {
        alert(err?.message || 'Unable to process');
      })
    } else {
      this.router.navigate(['/login']);
    }
  }
}

