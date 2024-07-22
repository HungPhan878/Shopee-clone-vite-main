/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// scss
import style from './RatingStar.module.scss'

// components
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

const cx = classNames.bind(style)

/* logic
index 0: 5 star có 5 ngôi sao màu vàng from indexStar 0 - 4
index 1: 5 star có 4 ngôi sao màu vàng from indexStar 0 - 3
index 2: có 3 ngôi sao màu vàng from indexStar 0 - 2
index 3: có 2 ngôi sao màu vàng from indexStar 0 - 1
index 4: có 1 ngôi sao màu vàng from indexStar 0 
=>indexStar < 5 - index sẽ có ngôi sao vàng
*/

interface Props {
  queryConfig: QueryConfig
}

export default function RatingStar({ queryConfig }: Props) {
  const { t } = useTranslation(['home'])
  const navigate = useNavigate()

  // handler function
  const handleClick = (ratingStars: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingStars)
      }).toString()
    })
  }

  return (
    <ul className={cx('aside-stars')}>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <li className={cx('aside-star')} key={index}>
            <div
              className={cx('aside-star__link')}
              onClick={() => handleClick(5 - index)}
              // là thẻ div nhưng có vai trò như button
              role='button'
              // phim có thể tương tác được tăng SEO
              tabIndex={0}
              // để eslint không kiểm tra element này
              aria-hidden='true'
            >
              {Array(5)
                .fill(0)
                .map((_, indexStar) => {
                  if (indexStar < 5 - index) {
                    return (
                      <span key={indexStar}>
                        <svg viewBox='0 0 9.5 8' className={cx('aside-star__icon')}>
                          <defs>
                            <linearGradient
                              id='ratingStarGradient'
                              x1='50%'
                              x2='50%'
                              y1='0%'
                              y2='100%'
                            >
                              <stop offset={0} stopColor='#ffca11' />
                              <stop offset={1} stopColor='#ffad27' />
                            </linearGradient>
                            <polygon
                              id='ratingStar'
                              points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                            />
                          </defs>
                          <g
                            fill='url(#ratingStarGradient)'
                            fillRule='evenodd'
                            stroke='none'
                            strokeWidth={1}
                          >
                            <g transform='translate(-876 -1270)'>
                              <g transform='translate(155 992)'>
                                <g transform='translate(600 29)'>
                                  <g transform='translate(10 239)'>
                                    <g transform='translate(101 10)'>
                                      <use
                                        stroke='#ffa727'
                                        strokeWidth='.5'
                                        xlinkHref='#ratingStar'
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </span>
                    )
                  }
                  return (
                    <span key={indexStar}>
                      <svg viewBox='0 0 30 30' className={cx('aside-star__icon')}>
                        <defs>
                          <linearGradient
                            id='star__hollow'
                            x1='50%'
                            x2='50%'
                            y1='0%'
                            y2='99.0177926%'
                          >
                            <stop offset='0%' stopColor='#FFD211' />
                            <stop offset='100%' stopColor='#FFAD27' />
                          </linearGradient>
                        </defs>
                        <path
                          fill='none'
                          fillRule='evenodd'
                          stroke='url(#star__hollow)'
                          strokeWidth={2}
                          d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                        />
                      </svg>
                    </span>
                  )
                })}
              {index !== 0 && (
                <span className={cx('aside-star__label')}>{t('aside filter.above')}</span>
              )}
            </div>
          </li>
        ))}
    </ul>
  )
}
