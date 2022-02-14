import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service'
import { ProductListResponse, ProductResponse } from 'src/app/interfaces/product';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  q = '';
  items: ProductResponse[] = [];
  searchForm: FormGroup;
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      query: [''],
    });
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.productService.items(this.q, this.page).subscribe((res: ProductListResponse) => {
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
