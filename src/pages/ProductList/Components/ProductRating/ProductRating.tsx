/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'

// scss
import style from './ProductRating.module.scss'

const cx = classNames.bind(style)

interface Props {
  rating: number
  activeClass?: string
  noActiveClass?: string
}

// rating = 3.4
// 1 < 3.4 100%
// 2 < 3.4 100%
// 3 < 3.4 100%
// 4 > 3.4 & 4 - 3.4 < 1 40%
// 5 > 3.4 & 5 - 3.4 > 1 0%

export default function ProductRating({ rating, activeClass, noActiveClass }: Props) {
  const newActiveClass = activeClass ? activeClass : cx('product-star__icon')
  const newNoActiveClass = noActiveClass ? noActiveClass : cx('product-star__icon--empty')

  // handler funtion
  const handleWidth = (index: number) => {
    if (rating >= index) {
      return '100%'
    } else if (rating < index && index - rating < 1) {
      return (rating - Math.floor(rating)) * 100 + '%'
    } else {
      return '0%'
    }
  }

  return (
    <div className={cx('product-rating__wrap')}>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className={cx('product-rating')} key={index}>
            <div className={cx('product-star')} style={{ width: handleWidth(index + 1) }}>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                className={newActiveClass}
              >
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
            <svg
              enableBackground='new 0 0 15 15'
              viewBox='0 0 15 15'
              x={0}
              y={0}
              className={newNoActiveClass}
            >
              <polygon
                points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        ))}
    </div>
  )
}
