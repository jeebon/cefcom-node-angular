export interface ProductResponse {
  _id: string,
  name: string,
  description: string,
  imageUrl: string,
  wishlist?: boolean,
  __v: number
}

export interface ProductListResponse {
  items: ProductResponse[];
  page: number,
  size: number,
  total: number
}
