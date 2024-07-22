/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

// scss
import style from './SearchBar.module.scss'
import { UseFormRegister } from 'react-hook-form'

const cx = classNames.bind(style)

interface Props {
  handleSubmitSearch?: () => void
  register?: UseFormRegister<any>
}

export default function SearchBar({ handleSubmitSearch, register }: Props) {
  const registerResult = register ? register('name') : null
  return (
    <form role='search' className={cx('search-bar__form')} onSubmit={handleSubmitSearch}>
      <input
        type='text'
        placeholder='ADIAS SĂN VOUCHER 1.000.000Đ'
        className={cx('search-bar__input')}
        {...registerResult}
      />
      <button className={cx('search-bar__btn')} type='submit'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className={cx('search-bar__icon')}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      </button>
    </form>
  )
}
