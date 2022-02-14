import { Component, OnInit } from '@angular/core';
import { ProductService, AuthService } from 'src/app/services'
import { ProductListResponse, ProductResponse } from 'src/app/interfaces/product';
import { UserResponseData } from 'src/app/interfaces/user';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  q = '';
  items: ProductResponse[] = [];
  searchForm: FormGroup;
  currentUser: UserResponseData;
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
      if (!this.currentUser) {
        this.router.navigate(['/login']);
      }
    });

    this.searchForm = this.formBuilder.group({
      query: [''],
    });
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.productService.wishlist(this.q, this.page).subscribe((res: ProductListResponse) => {
      this.items = res.items;
      this.collectionSize = res.total;
      this.pageSize = res.size;
    }, err => {

    })
  }
  onPageChange(pageNum: number) {
    this.page = pageNum;
    this.getItems();
  }


  onSubmit() {
    this.q = this.searchForm.value['query'];
    this.page = 1;
    this.pageSize = 10;
    this.collectionSize = 0;
    this.getItems();
  }
}
