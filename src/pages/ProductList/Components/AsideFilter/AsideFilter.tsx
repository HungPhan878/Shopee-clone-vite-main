/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { ObjectSchema } from 'yup'
import { useTranslation } from 'react-i18next'

// scss
import style from './AsideFilter.module.scss'

// components
import Button from 'src/Components/Button'
import { Category } from 'src/types/category.type'
import path from 'src/constants/path'
import InputNumber from 'src/Components/InputNumber'
import { Controller, useForm } from 'react-hook-form'
import { SchemaType, schema } from 'src/utils/rules'
import { NoUndefinedField } from 'src/types/util.type'
import RatingStar from '../RatingStar'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'

const cx = classNames.bind(style)

interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}

type FormData = NoUndefinedField<Pick<SchemaType, 'price_min' | 'price_max'>>

const priceSchema = schema.pick(['price_min', 'price_max'])

// Rule validates of price
// th1: nếu có cả hai giá trị price(min and max) thì max > min
// th2: nếu chỉ có một giá trị min or max thì được(min or max !== '')

export default function AsideFilter(props: Props) {
  const { t } = useTranslation(['home']) //dùng ns nào thì khai báo cụ thể ra
  const { categories, queryConfig } = props
  const { category } = queryConfig
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>),
    //  sự kiên này hoặc động khi ta truyền ref từ component vào react HF sẽ tự đông
    // focus vào một component nào đó.
    //mặc định là true
    shouldFocusError: false
  })
  // handler function
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    reset()
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['price_min', 'price_max', 'category', 'rating_filter']
        )
      ).toString()
    })
  }

  return (
    <div className={cx('aside-inner')}>
      <Link to={path.home} className={cx('aside-label', { 'aside-label--active': !category })}>
        <svg viewBox='0 0 12 10' className={cx('aside-icon')}>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <h1>{t('aside filter.all categories')}</h1>
      </Link>

      <div className={cx('aside-separate')}></div>

      <ul className={cx('category-list')}>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className={cx('category-item')} key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={cx('category-link', { 'category-link--active': isActive })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className={cx('category-item__icon')}>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                <span>{categoryItem.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>

      <div className={cx('aside-filter')}>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className={cx('aside-icon')}
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        <h2>{t('aside filter.filter search')}</h2>
      </div>

      <div className={cx('aside-filter__wrap')}>
        <div className={cx('aside-filter__price')}>
          <div> {t('aside filter.price range')}</div>
          <form className={cx('aside-form')} onSubmit={onSubmit}>
            <div className={cx('aside-form__row')}>
              <Controller
                control={control}
                name='price_min'
                render={({ field }) => (
                  <InputNumber
                    type='text'
                    placeholder={`₫ ${t('aside filter.from')}`}
                    className={cx('aside-form__input-wrap')}
                    classNameInput={cx('aside-form__input')}
                    classNameError={cx('aside-form__err')}
                    // value={field.value}
                    // ref={field.ref}
                    // 2 props ở trên rút gọn = prop ở dưới
                    {...field}
                    // truyền event của input vào react hook form để quản lý data
                    onChange={field.onChange}
                    // lấy value của react hf ta đã truyền từ trước qua event để
                    // truyền vào lại input để có giữ liệu
                    // cho form
                  />
                )}
              />

              <div className={cx('aside-form__separate')}>-</div>

              <Controller
                control={control}
                name='price_max'
                render={({ field }) => (
                  <InputNumber
                    type='text'
                    placeholder={`₫ ${t('aside filter.to')}`}
                    className={cx('aside-form__input-wrap')}
                    classNameInput={cx('aside-form__input')}
                    classNameError={cx('aside-form__err')}
                    {...field}
                    onChange={field.onChange}
                    // Về vấn đề trigger mặc định chỉ validate một form khi nhập thì đã hủy ở version mới
                    // thay vào đó nếu hai input có liên kết name với nhau thì sẽ validate chung
                    // mà không cần dùng đến trigger
                  />
                )}
              />
            </div>
            <p className={cx('aside-form__input-err')}>{errors.price_min?.message}</p>
            <Button type='submit'> {t('aside filter.apply')}</Button>
          </form>
        </div>
      </div>

      <div className={cx('aside-separate')}></div>

      <div className={cx('aside-filter__label')}> {t('aside filter.evaluate')}</div>

      {/* RatingStar */}
      <RatingStar queryConfig={queryConfig} />
      <div className={cx('aside-separate')}></div>

      <Button onClick={handleRemoveAll}> {t('aside filter.delete all')}</Button>
    </div>
  )
}
