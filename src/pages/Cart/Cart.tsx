/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { Fragment, useContext, useEffect, useMemo } from 'react'
// lodash không có tree-shaking nên phải import rõ ràng như vậy
//tree-shaking là import prop nào thì chỉ lấy ra prop đó thôi không lấy ra cả framework
//visualizer chi duoc lay ra khi npm run build thoi nha
import keyBy from 'lodash/keyBy'
import { useTranslation } from 'react-i18next'
import { Flip, toast } from 'react-toastify'
import { Link, useLocation } from 'react-router-dom'

// scss
import style from './Cart.module.scss'

// components
import purchasesApi from 'src/apis/purchases.api'
import { purchasesStatus } from 'src/constants/purchases'
import { formatCurrency, generateNameId } from 'src/utils/util'
import QuantityController from 'src/Components/QuantityController'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/Components/Button'
import path from 'src/constants/path'
import noProduct from 'src/assets/images/no-product.png'

const cx = classNames.bind(style)

// logic checkAll
// 1.làm checked cho mỗi input trước đã
// 2.tạo ra một biến isCheckAll để test xem tất cả item
// trong map đã check hết chưa nếu rùi isCheckAll = true
// 3. khi click vào nut chọn tất cả sẽ !isCheckAll

export default function Cart() {
  const { t } = useTranslation(['cart']) //dùng ns nào thì khai báo cụ thể ra
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const location = useLocation()
  // b2 + useMemo to optimize performance không bị tính toán đi lại qua nhìu lần khi re-render lại component khi checked
  // Note: dùng vừa đủ và đúng dependence thôi nha
  const isCheckAll = useMemo(
    () => extendedPurchases.every((purchases) => purchases.checked),
    [extendedPurchases]
  )
  const checkedPurchases = useMemo(
    () => extendedPurchases.filter((purchases) => purchases.checked),
    [extendedPurchases]
  )
  const checkedPurchasesCount = checkedPurchases.length
  const choosePurchasesFromLocation = ((location.state as { purchasesId: string }) || null)
    ?.purchasesId

  // [GET] /purchases
  const getPurchasesList = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesApi.getPurchasesList({ status: purchasesStatus.inCart })
  })
  const purchasesList = getPurchasesList.data?.data.data

  // [PUT] /purchases/update-purchase
  const updatePurchasesMutation = useMutation({
    mutationFn: purchasesApi.updatePurchases,
    onSuccess: () => {
      // Call lại getPurchases list để làm mất đi disable khi update thành công
      getPurchasesList.refetch()
    }
  })

  // [DELETE] /purchases
  const deletePurchasesMutation = useMutation({
    mutationFn: purchasesApi.deletePurchases,
    onSuccess: () => {
      getPurchasesList.refetch()
    }
  })

  // [POST] /purchases/buy-products
  const buyPurchasesMutation = useMutation({
    mutationFn: purchasesApi.buyPurchases,
    onSuccess: (data) => {
      getPurchasesList.refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000,
        transition: Flip
      })
    }
  })

  useEffect(() => {
    if (purchasesList) {
      setExtendedPurchases((prev) => {
        // Dùng để bảo lưu checked lúc trước
        const objectId = keyBy(prev, '_id')
        return (
          purchasesList.map((purchases) => {
            const isChooseCheckedPurchases = choosePurchasesFromLocation === purchases._id
            return {
              ...purchases,
              checked: isChooseCheckedPurchases || Boolean(objectId[purchases._id]?.checked),
              disabled: false
            }
          }) || []
        )
      })
    }
  }, [purchasesList, choosePurchasesFromLocation, setExtendedPurchases])

  useEffect(() => {
    // khai báo trong cleanup fuction để khi unmount sẽ xóa bỏ state cũ đi
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  // handler function
  const totalCheckedPurchasesPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, purchases) => {
        return result + purchases.price * purchases.buy_count
      }, 0),
    [checkedPurchases]
  )

  const totalCheckedPurchasesSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, purchases) => {
        return result + (purchases.price_before_discount - purchases.price) * purchases.buy_count
      }, 0),
    [checkedPurchases]
  )

  const handleChecked =
    (purchasesIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setExtendedPurchases(
        produce((draft) => {
          // Mutate trong react js là cấm nhưng dùng immerjs mutate thì lại rất an toàn.
          draft[purchasesIndex].checked = event.target.checked
        })
      )
    }

  const handleCheckedAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchases) => ({
        ...purchases,
        checked: !isCheckAll
      }))
    )
  }

  const handleChangeQuantity = (purchasesIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchases = extendedPurchases[purchasesIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchasesIndex].disabled = true
        })
      )
      updatePurchasesMutation.mutate({ product_id: purchases.product._id, buy_count: value })
    }
  }

  const handleTypeQuantity = (purchasesIndex: number, value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchasesIndex].buy_count = value
      })
    )
  }

  const handleDeletePurchases = (purchasesIndex: number) => {
    const purchasesId = extendedPurchases[purchasesIndex]._id
    deletePurchasesMutation.mutate([purchasesId])
  }

  const handleDeletePurchasesList = () => {
    if (checkedPurchasesCount > 0) {
      const purchasesIds = checkedPurchases.map((purchases) => purchases._id)
      deletePurchasesMutation.mutate(purchasesIds)
    }
  }

  const handleBuyPurchases = () => {
    if (checkedPurchasesCount > 0) {
      const purchasesList = checkedPurchases.map((purchases) => ({
        product_id: purchases.product._id,
        buy_count: purchases.buy_count
      }))
      buyPurchasesMutation.mutate(purchasesList)
    }
  }

  return (
    <section className={cx('cart__wrapper')}>
      <div className='container'>
        {extendedPurchases && extendedPurchases.length > 0 ? (
          <Fragment>
            {/* top */}
            <div className={cx('cart__scroll')}>
              <div className={cx('cart__inner')}>
                <div className={cx('cart__row')}>
                  <div className='row row-cols-2'>
                    <div className='col'>
                      <div className={cx('cart-checkbox__wrap')}>
                        <div className={cx('cart-checkbox__inner')}>
                          <input
                            type='checkbox'
                            className={cx('cart-checkbox')}
                            checked={isCheckAll}
                            onChange={handleCheckedAll}
                          />
                        </div>
                        <span className={cx('cart-checkbox__label')}>{t('product')}</span>
                      </div>
                    </div>

                    <div className='col'>
                      <div className='row'>
                        <div className='col col-4'>{t('unit price')}</div>
                        <div className='col col-8'>
                          <div className='row row-cols-3'>
                            <div className='col '>{t('quantity')}</div>
                            <div className='col '>{t('amount of money')}</div>
                            <div className='col '>{t('operation')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* purchases list */}

                <div className={cx('cart__row', 'mt-12', 'mb-12')}>
                  {extendedPurchases?.map((purchasesItem, index) => (
                    <article className={cx('cart-item__wrap')} key={purchasesItem._id}>
                      <div className={cx('row', 'row-cols-2', 'align-center')}>
                        <div className='col'>
                          <div className={cx('cart-item__row')}>
                            <div className={cx('cart-checkbox__inner')}>
                              <input
                                type='checkbox'
                                className={cx('cart-checkbox')}
                                checked={purchasesItem.checked}
                                onChange={handleChecked(index)}
                              />
                            </div>
                            <Link
                              to={`${path.home}${generateNameId({ name: purchasesItem.product.name, id: purchasesItem.product._id })}`}
                              className={cx('cart-item__link')}
                            >
                              <img
                                src={purchasesItem.product.image}
                                alt={purchasesItem.product.name}
                                className={cx('cart-item__thumb')}
                              />

                              <h3 className={cx('cart-item__title')}>
                                {purchasesItem.product.name}
                              </h3>
                            </Link>
                          </div>
                        </div>
                        <div className='col'>
                          <div className={cx('row', 'align-center')}>
                            <div className='col-4'>
                              <div className={cx('cart-item__price')}>
                                <span className={cx('cart-item__price-discount')}>
                                  ₫{formatCurrency(purchasesItem.product.price_before_discount)}
                                </span>
                                <span>₫{formatCurrency(purchasesItem.product.price)}</span>
                              </div>
                            </div>
                            <div className='col-8'>
                              <div className={cx('row', 'row-cols-3', 'align-center')}>
                                <div className='col'>
                                  <QuantityController
                                    max={purchasesItem.product.quantity}
                                    value={purchasesItem.buy_count}
                                    onDecrease={(value) =>
                                      handleChangeQuantity(
                                        index,
                                        value,
                                        value >= 1 &&
                                          // để không phải call api vơi buy count trùng với lần trước nó
                                          value !==
                                            (purchasesList && purchasesList[index])?.buy_count
                                      )
                                    }
                                    onIncrease={(value) =>
                                      handleChangeQuantity(
                                        index,
                                        value,
                                        value <= purchasesItem.product.quantity &&
                                          value !==
                                            (purchasesList && purchasesList[index])?.buy_count
                                      )
                                    }
                                    onType={(value) => handleTypeQuantity(index, value)}
                                    onFocusOut={(value) =>
                                      handleChangeQuantity(
                                        index,
                                        value,
                                        value <= purchasesItem.product.quantity &&
                                          value >= 1 &&
                                          value !==
                                            (purchasesList && purchasesList[index])?.buy_count
                                      )
                                    }
                                    disabled={purchasesItem.disabled}
                                  />
                                </div>
                                <div className='col'>
                                  <span className={cx('cart-item__price-total')}>
                                    ₫
                                    {formatCurrency(
                                      purchasesItem.product.price * purchasesItem.buy_count
                                    )}
                                  </span>
                                </div>
                                <div className='col'>
                                  <button
                                    className={cx('cart-item__btn-delete')}
                                    onClick={() => handleDeletePurchases(index)}
                                  >
                                    {t('delete')}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* bottom */}
            <div className={cx('cart-bottom', 'mt-32')}>
              <div className={cx('cart__row', 'flex-center', 'cart__bottom-row')}>
                <div className={cx('cart-btns_wrap')}>
                  <div className={cx('cart-checkbox__inner')}>
                    <input
                      type='checkbox'
                      className={cx('cart-checkbox')}
                      checked={isCheckAll}
                      onChange={handleCheckedAll}
                    />
                  </div>
                  <button className={cx('cart-btn')} onClick={handleCheckedAll}>
                    {t('select all')} ({purchasesList?.length})
                  </button>
                  <button className={cx('cart-btn')} onClick={handleDeletePurchasesList}>
                    {t('delete all')} ({checkedPurchasesCount})
                  </button>
                </div>

                <div className={cx('cart-buy__purchases')}>
                  <div>
                    <div className={cx('cart-buy__purchases-total')}>
                      <span>{t('total payment')} :</span>
                      <span className={cx('cart-buy__purchases-price-total')}>
                        ₫{formatCurrency(totalCheckedPurchasesPrice)}
                      </span>
                    </div>

                    <div className={cx('cart-buy__purchases-price-saving')}>
                      <span>{t('savings')}</span>
                      <span className={cx('cart-buy__purchases-number')}>
                        ₫{formatCurrency(totalCheckedPurchasesSavingPrice)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className={cx('cart-buy_purchases-btn')}
                    onClick={handleBuyPurchases}
                    disabled={buyPurchasesMutation.isPending}
                    isLoading={buyPurchasesMutation.isPending}
                  >
                    <span>{t('purchase')}</span>
                  </Button>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className={cx('cart__no-product')}>
            <img src={noProduct} alt='no product' className={cx('cart__no-product__img')} />
            <p className={cx('cart__no-product__label')}>{t('your shopping cart is empty')}</p>
            <Link to={path.home} className={cx('cart__no-product__btn')}>
              {t('buy now')}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
