/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// scss
import style from './Product.module.scss'

// components
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/util'
import ProductRating from '../ProductRating'
import path from 'src/constants/path'

const cx = classNames.bind(style)

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  const { t } = useTranslation(['product']) //dùng ns nào thì khai báo cụ thể ra

  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <article className={cx('product-wrap')}>
        <div className={cx('product-inner')}>
          <img src={product.image} alt={product.name} className={cx('product-img')} />
        </div>

        <section className={cx('product-info')}>
          <h3 className={cx('product-heading')}>{product.name}</h3>
          <div className={cx('product-row')}>
            <div className={cx('product-price__old')}>
              <span>đ</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>

            <div className={cx('product-price__curr')}>
              <span>đ</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>

          <div className={cx('product-row')}>
            <ProductRating rating={product.rating} />

            <div className={cx('product-sold')}>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span>{t('sold')}</span>
            </div>
          </div>

          <div className={cx('product-national')}>US-UK</div>
        </section>
      </article>
    </Link>
  )
}
