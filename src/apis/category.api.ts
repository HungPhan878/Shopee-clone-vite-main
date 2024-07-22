import { Category } from 'src/types/category.type'
import { SuccessResponsiveApi } from 'src/types/util.type'
import http from 'src/utils/http'

const URL = 'categories'

const categoriesApi = {
  getCategories() {
    return http.get<SuccessResponsiveApi<Category[]>>(URL)
  }
}

export default categoriesApi
