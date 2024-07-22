/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { Link, createSearchParams } from 'react-router-dom'

// scss
import style from './Pagination.module.scss'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

const cx = classNames.bind(style)

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2

export default function Pagination({ queryConfig, pageSize }: Props) {
  const pageCurr = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span className={cx('pgt-btn')} key={index}>
            ...
          </span>
        )
      }
      return null
    }

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span className={cx('pgt-btn')} key={index}>
            ...
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        if (
          pageCurr <= RANGE * 2 + 1 &&
          pageNumber > pageCurr + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index)
        } else if (pageCurr > RANGE * 2 + 1 && pageCurr < pageSize - RANGE * 2) {
          if (pageNumber < pageCurr - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > pageCurr + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (
          pageCurr >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < pageCurr - RANGE
        ) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: '/',
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={cx('pgt-btn', {
              'pgt-btn--active': pageCurr === pageNumber
            })}
            key={index}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className={cx('pgt-wrapper')}>
      {pageCurr === 1 ? (
        <span className={cx('pgt-btn', 'pgt-btn--disable', 'd-sm-none')}>prev</span>
      ) : (
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...queryConfig,
              page: (pageCurr - 1).toString()
            }).toString()
          }}
          className={cx('pgt-btn', 'd-sm-none')}
        >
          prev
        </Link>
      )}
      {renderPagination()}
      {pageCurr === pageSize ? (
        <span className={cx('pgt-btn', 'pgt-btn--disable', 'd-sm-none')}>next</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (pageCurr + 1).toString()
            }).toString()
          }}
          className={cx('pgt-btn', 'd-sm-none')}
        >
          next
        </Link>
      )}
    </div>
  )
}
