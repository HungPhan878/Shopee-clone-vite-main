/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { Link, createSearchParams } from 'react-router-dom'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

// scss
import style from './HistoryPurchases.module.scss'

// components
import useQueryParams from 'src/hooks/useQueryParams'
import purchasesApi from 'src/apis/purchases.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchases'
import { PurchasesListStatus } from 'src/types/purchases.type'
import { formatCurrency, generateNameId } from 'src/utils/util'
import noCart from 'src/assets/images/no-cart.png'
import { useMemo } from 'react'

const cx = classNames.bind(style)

export default function HistoryPurchases() {
  const { t } = useTranslation(['profile']) //dùng ns nào thì khai báo cụ thể ra
  const queryParams = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all
  const purchasesTabs = useMemo(() => {
    return [
      { status: purchasesStatus.all, name: `${t('purchase.all')}` },
      {
        status: purchasesStatus.WaitForConfirmation,
        name: `${t('purchase.wait for confirmation')}`
      },
      { status: purchasesStatus.waitForGetting, name: `${t('purchase.wait for getting')}` },
      { status: purchasesStatus.inProgress, name: `${t('purchase.in progress')}` },
      { status: purchasesStatus.delivered, name: `${t('purchase.delivered')}` },
      { status: purchasesStatus.cancelled, name: `${t('purchase.cancelled')}` }
    ]
  }, [t])
  // [GET] /purchases
  const getPurchasesList = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchasesApi.getPurchasesList({ status: status as PurchasesListStatus }),
    placeholderData: keepPreviousData
  })
  const purchasesList = getPurchasesList.data?.data.data

  const purchasesSideNav = () => {
    return purchasesTabs.map((purchasesItem) => (
      <Link
        key={purchasesItem.status}
        to={{
          pathname: path.historyPurchases,
          search: createSearchParams({
            status: String(purchasesItem.status)
          }).toString()
        }}
        className={cx('purchases-nav__link', {
          'purchases-nav__link--active': status === purchasesItem.status
        })}
      >
        {purchasesItem.name}
      </Link>
    ))
  }

  return (
    <div>
      <Helmet>
        <title>Shopee Clone | Theo Dõi Đơn Hàng</title>
        <meta name='description' content='Tra Cứu và theo dõi đơn hàng của bạn.' />
      </Helmet>

      <div style={{ overflow: 'auto' }}>
        <nav className={cx('purchases-nav__wrap')}>{purchasesSideNav()}</nav>
      </div>

      <ul className={cx('purchases-list')}>
        {purchasesList && purchasesList.length > 0 ? (
          purchasesList?.map((purchasesItem) => (
            <li className={cx('purchases-item')} key={purchasesItem._id}>
              <Link
                to={`${path.home}${generateNameId({ name: purchasesItem.product.name, id: purchasesItem.product._id })}`}
                className={cx('purchases-item__link')}
              >
                <img
                  src={purchasesItem.product.image}
                  alt={purchasesItem.product.name}
                  className={cx('purchases-item__thumb')}
                />
                <div className={cx('purchases-info')}>
                  <h2 className={cx('purchases-info__title')}>{purchasesItem.product.name}</h2>
                  <p className={cx('purchases-info_qty')}>x{purchasesItem.buy_count}</p>
                </div>
                <div className={cx('purchases-price')}>
                  <span className={cx('purchases-price__discount')}>
                    ₫{formatCurrency(purchasesItem.price_before_discount)}
                  </span>
                  <span className={cx('purchases-price__curr')}>
                    ₫{formatCurrency(purchasesItem.price)}
                  </span>
                </div>
              </Link>

              <div className={cx('purchases-item__row')}>
                <span className={cx('purchases-item__total-name')}>
                  {t('purchase.total price')}:
                </span>
                <span className={cx('purchases-item__total-price')}>
                  ₫{formatCurrency(purchasesItem.price * purchasesItem.buy_count)}
                </span>
              </div>
            </li>
          ))
        ) : (
          <>
            <div className={cx('purchases-no-cart')}>
              <img src={noCart} alt='no cart' className={cx('purchases-no-cart__img')} />
              <p className={cx('purchases-no-cart__label')}>{t('purchase.no orders yet')}</p>
            </div>
          </>
        )}
      </ul>
    </div>
  )
}
