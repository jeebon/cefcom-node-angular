import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductListResponse, ProductResponse } from 'src/app/interfaces/product';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api = `${environment.server_url}/api/${environment.api_version}/products`;

  constructor(
    private http: HttpClient
  ) {

  }

  items(q: string, page: number) {
    q = q ? q : '';
    page = (page ? page : 1) - 1;
    return this.http.get<ProductListResponse>(`${this.api}?q=${q}&page=${page}`);
  }
}
