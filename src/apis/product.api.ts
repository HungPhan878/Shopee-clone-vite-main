// components
import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponsiveApi } from 'src/types/util.type'
import http from 'src/utils/http'

const URL = 'products'

const productApi = {
  getProductList(params: ProductListConfig) {
    return http.get<SuccessResponsiveApi<ProductList>>(URL, { params })
  },
  getProductDetail(productId: string) {
    return http.get<SuccessResponsiveApi<Product>>(`${URL}/${productId}`)
  }
}

export default productApi
