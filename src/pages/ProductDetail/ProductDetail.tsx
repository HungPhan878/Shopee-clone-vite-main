/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useTranslation } from 'react-i18next'
import { convert } from 'html-to-text'

// scss
import style from './ProductDetail.module.scss'

// components
import productApi from 'src/apis/product.api'
import ProductRating from '../ProductList/Components/ProductRating'
import {
  formatCurrency,
  formatNumberToSocialStyle,
  getIdFromNameId,
  percentDiscount
} from 'src/utils/util'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import Product from '../ProductList/Components/Product'
import QuantityController from 'src/Components/QuantityController'
import purchasesApi from 'src/apis/purchases.api'
import { purchasesStatus } from 'src/constants/purchases'
import { toast } from 'react-toastify'
import path from 'src/constants/path'
import { Helmet } from 'react-helmet-async'

const cx = classNames.bind(style)

export default function ProductDetail() {
  const { t } = useTranslation(['product'])
  const { nameId } = useParams()
  const queryClient = useQueryClient()
  const id = getIdFromNameId(nameId as string)
  // Để khi next prev thay đổi được đoạn slice để hiển thị ảnh
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  // Dùng để khi hover vào hiện ảnh ra và active
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  // state cua QuantityController duoc manager boi component cha
  // de de quan ly data truyen cho cac component khac
  // trừ khi đk kiên chỉ test trong component con đó thôi ex:InputNumber
  // thì mới viết logic trong nó nha
  const [buyCount, setBuyCount] = useState(1)
  const navigate = useNavigate()

  // Get productDetail
  const productDetail = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetail?.data?.data.data

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  const queryConfig: ProductListConfig = { page: '1', limit: '20', category: product?.category._id }
  // GET DATA of the same products
  const getProducts = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProductList(queryConfig),
    placeholderData: keepPreviousData,
    // để fix th chưa có product mà get api
    // enable = true thì mới gọi api
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })
  const products = getProducts.data?.data.data

  // ADD PURCHASES IN CART
  const addPurchasesMutation = useMutation({ mutationFn: purchasesApi.addToCart })

  // Khi lần đầu vào sẽ luôn ở tấm ảnh đầu của đoan slides
  useEffect(() => {
    if (product && product?.images.length > 0) {
      setActiveImage(product?.images[0])
    }
  }, [product])

  // handler function
  const handleSwitch = (img: string) => {
    setActiveImage(img)
  }

  const handleNext = () => {
    if (currentIndexImages[1] < (product as ProductType)?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const handlePrev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // b3:lấy ra tọa độ của thẻ figure
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement

    // b1:Lấy ra kích thước gốc của ảnh
    const { naturalWidth, naturalHeight } = image

    // b3: lấy ra tọa độ x y của con trỏ chuột khi hover vào thẻ figure đầu gốc trái trên
    // của thẻ figure là x=o y=o
    //C1:lấy tọa độ khi hover vào thẻ figure nhưng bị event nổi bọt
    const { offsetX, offsetY } = event.nativeEvent

    //c2:lấy tọa độ nhưng bất chấp sự kiện nổi bọt
    // const offsetX = event.pageX - (rect.x + window.scrollX)
    // const offsetY = event.pageY - (rect.y + window.scrollY)

    // b3:tính ra position của bức ảnh khi tỷ lệ với thẻ figure(ảnh / thẻ cha vì ảnh > thẻ cha) và tính ra giá trị âm
    // để đẩy bức hình ra đúng tọa độ mà thuật toán đã tính.
    // khi hover vào thẻ cha
    const left = offsetX * (1 - naturalWidth / rect.width)
    const top = offsetY * (1 - naturalHeight / rect.height)

    // b1: thay đổi kich thước image về kich thước original của img
    image.style.height = naturalHeight + 'px'
    image.style.width = naturalWidth + 'px'

    // b2:Cho ảnh không bị giới hạn width nữa
    image.style.maxWidth = 'unset'

    // b4: set top và left cho img
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveImage = () => {
    ;(imageRef.current as HTMLImageElement).removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const handleAddToCart = () => {
    addPurchasesMutation.mutate(
      {
        product_id: product?._id as string,
        buy_count: buyCount
      },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, {
            autoClose: 1000
            // position: 'top-center'
          })
          // Hàm này sẽ kiểm tra nếu lần call api query key không hợp lệ nữa (kết quả cho về không đúng nữa)
          // thì sẽ call lại api get purchases
          queryClient.invalidateQueries({
            queryKey: ['purchases', { status: purchasesStatus.inCart }]
          })
        }
      }
    )
  }

  const handleBuyRightNow = async () => {
    const res = await addPurchasesMutation.mutateAsync({
      product_id: product?._id as string,
      buy_count: buyCount
    })
    const purchases = res.data.data
    navigate(path.cart, {
      state: {
        purchasesId: purchases?._id
      }
    })
  }

  if (!product) return null

  return (
    <section className={cx('product-wrap')}>
      <Helmet>
        <title>{product.name} | Shopee Clone</title>
        <meta
          name='description'
          content={convert(product.description, {
            limits: {
              maxInputLength: 200
            }
          })}
        />
      </Helmet>
      <div className='container'>
        <div className={cx('product-inner')}>
          <div className={cx('row')}>
            <div className='col-5 col-md-12'>
              <figure
                className={cx('product-image__inner')}
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveImage}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  ref={imageRef}
                  className={cx('product-img')}
                />
              </figure>

              <div className={cx('product-slides__wrap')}>
                <button className={cx('product-btn__switch')} onClick={handlePrev}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className={cx('product-icon__chevron')}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 19.5L8.25 12l7.5-7.5'
                    />
                  </svg>
                </button>

                {currentImages.map((img, index) => (
                  <div
                    className={cx('product-thumb__wrap')}
                    key={index}
                    onMouseEnter={() => handleSwitch(img)}
                  >
                    <img src={img} alt={product.name} className={cx('product-thumb')} />
                    {img === activeImage && <div className={cx('product-thumb--active')}></div>}
                  </div>
                ))}

                <button className={cx('product-btn__switch')} onClick={handleNext}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className={cx('product-icon__chevron')}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.25 4.5l7.5 7.5-7.5 7.5'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-7 col-md-12 gy-md-2'>
              <h1 className={cx('product-heading')}>{product.name}</h1>

              <div className={cx('product-row')}>
                <div className={cx('product-rating')}>
                  <span className={cx('product-rating__number')}>{product.rating}</span>
                  <ProductRating
                    activeClass={cx('product-rating__star')}
                    noActiveClass={cx('product-rating__star--empty')}
                    rating={product.rating}
                  />
                </div>

                <div className={cx('product-separate')}></div>

                <div className={cx('product-sold')}>
                  <span className={cx('product-sold__quantity')}>
                    {formatNumberToSocialStyle(product.sold)}
                  </span>
                  <span className={cx('product-sold__label')}>{t('sold')}</span>
                </div>
              </div>

              <div className={cx('product-row')}>
                <div className={cx('product-sell__wrap')}>
                  <div className={cx('product-sell__discount')}>
                    <span>₫</span>
                    <span>{formatCurrency(product.price_before_discount)}</span>
                  </div>

                  <div className={cx('product-sell__price-curr')}>
                    <span>₫</span>
                    <span>{formatCurrency(product.price)}</span>
                  </div>

                  <div className={cx('product-sell__percent-discount')}>
                    <span>{percentDiscount(product.price_before_discount, product.price)}</span>
                    <span>{t('discount')}</span>
                  </div>
                </div>
              </div>

              <div className={cx('product-row')}>
                <p className={cx('product-qty__label')}>{t('quantity')}</p>

                {/* quantity controller */}
                <QuantityController
                  classNameWrap={cx('product-qty__wrap')}
                  max={product.quantity}
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                />

                <div className={cx('product-qty__number')}>
                  <span>{product.quantity}</span>
                  <span>{t('available product')}</span>
                </div>
              </div>

              <div className={cx('product-row')}>
                <div className={cx('product-btns')}>
                  <button className={cx('product-btn__add-cart')} onClick={handleAddToCart}>
                    <svg
                      enableBackground='new 0 0 15 15'
                      viewBox='0 0 15 15'
                      x={0}
                      y={0}
                      className={cx('product-btn__add-cart-icon')}
                    >
                      <g>
                        <g>
                          <polyline
                            fill='none'
                            points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit={10}
                          />
                          <circle cx={6} cy='13.5' r={1} stroke='none' />
                          <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                        </g>
                        <line
                          fill='none'
                          strokeLinecap='round'
                          strokeMiterlimit={10}
                          x1='7.5'
                          x2='10.5'
                          y1={7}
                          y2={7}
                        />
                        <line
                          fill='none'
                          strokeLinecap='round'
                          strokeMiterlimit={10}
                          x1={9}
                          x2={9}
                          y1='8.5'
                          y2='5.5'
                        />
                      </g>
                    </svg>

                    <span>{t('add to cart')}</span>
                  </button>

                  <button className={cx('product-btn__buy-now')} onClick={handleBuyRightNow}>
                    {t('buy now')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx('product-inner', 'mt-8')}>
          <div className={cx('product-title__wrap')}>
            <h2 className={cx('product-title')}>{t('product description')}</h2>
          </div>
          <div className={cx('product-desc__wrap')}>
            <div
              className={cx('product-desc')}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            ></div>
          </div>
        </div>

        <div className={cx('mt-8')}>
          <h2 className={cx('product-list__title')}>{t('you may also like')}</h2>
          {products && (
            <div className='row row-cols-6 row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 gy-1 gx-1'>
              {/* tạo ra một mảng 30 phần tử nhưng empty thì phải cho fill vào để đổ đầy giá trị là 0 
                  và dùng index để render ra */}
              {products.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
