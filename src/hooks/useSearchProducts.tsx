import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import omit from 'lodash/omit'
import { yupResolver } from '@hookform/resolvers/yup'

// components
import useQueryConfig from './useQueryConfig'
import path from 'src/constants/path'
import { SchemaType, schema } from 'src/utils/rules'

type FormData = Pick<SchemaType, 'name'>

const searchSchema = schema.pick(['name'])

export default function useSearchProducts() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(searchSchema)
  })

  // handler funtion
  const handleSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { register, handleSubmitSearch }
}
