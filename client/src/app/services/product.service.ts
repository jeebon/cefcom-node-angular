import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductListResponse, ProductResponse } from 'src/app/interfaces/product';
import { CommonResponse } from 'src/app/interfaces/http-responses';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api = `${environment.server_url}/api/${environment.api_version}`;

  constructor(
    private http: HttpClient
  ) {

  }

  items(q: string, page: number) {
    q = q ? q : '';
    page = (page ? page : 1) - 1;
    return this.http.get<ProductListResponse>(`${this.api}/products?q=${q}&page=${page}`);
  }

  addWishlist(id: string) {
    return this.http.post<CommonResponse>(`${this.api}/wishlists`, { product: id });
  }

  removeFromWishlist(id: string) {
    return this.http.delete<CommonResponse>(`${this.api}/wishlists/${id}`);
  }

  wishlist(q: string, page: number) {
    q = q ? q : '';
    page = (page ? page : 1) - 1;
    return this.http.get<ProductListResponse>(`${this.api}/wishlists?q=${q}&page=${page}`);
  }
}
