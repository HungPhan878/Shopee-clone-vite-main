import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'

// components
import useQueryParams from './useQueryParams'
import { ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  // omitBy dùng để loại trừ giá trị undefine cho queryconfig
  // tạo queryconfig để khi gán query params cho url thì vẫn giữ được những key value khác
  // Khi một biến phụ thuộc một biến thì không cần tạo ra undefine
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '10',
      order: queryParams.order,
      sort_by: queryParams.sort_by,
      category: queryParams.category,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )
  return queryConfig
}
