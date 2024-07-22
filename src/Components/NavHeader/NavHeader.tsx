/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// scss
import style from './NavHeader.module.scss'

// components
import Popover from '../Popover'
import { AppContext } from 'src/contexts/app.context'
import { logout } from 'src/apis/auth.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchases'
import { getAvatarName } from 'src/utils/util'
import { locales } from 'src/i18n/i18n'

const cx = classNames.bind(style)

export default function NavHeader() {
  const { i18n, t } = useTranslation(['header', 'login'])
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const { isAuthenticated, setAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()

  // [POST] LOG OUT
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuthenticated(false)
      setProfile(null)
      // => cho vào để khi logout không còn data purchases nữa nha
      queryClient.removeQueries({
        queryKey: ['purchases', { status: purchasesStatus.inCart }]
      })
    }
  })

  // handler function
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleChangeLanguage = (lng: 'vi' | 'en') => {
    i18n.changeLanguage(lng)
  }
  return (
    <div className={cx('header-top')}>
      <ul className={cx('header-list')}>
        <li className={cx('header-item')}>
          <Popover
            className={cx('header-item__wrap')}
            renderProps={
              <div className={cx('ppv-lang__row')}>
                <button className={cx('ppv-lang__btn')} onClick={() => handleChangeLanguage('vi')}>
                  Tiếng Việt
                </button>
                <button className={cx('ppv-lang__btn')} onClick={() => handleChangeLanguage('en')}>
                  English
                </button>
              </div>
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className={cx('header-item__icon')}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className={cx('header-item__label')}>{currentLanguage}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className={cx('header-item__icon')}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
            </svg>
          </Popover>
        </li>
        <li className={cx('header-item')}>
          {isAuthenticated && (
            <Popover
              className={cx('header-item__wrap')}
              renderProps={
                <ul className={cx('ppv-info__list')}>
                  <li className={cx('ppv-info__item')}>
                    <Link to={path.profile} className={cx('ppv-info__link')}>
                      {t('my account')}
                    </Link>
                  </li>
                  <li className={cx('ppv-info__item')}>
                    <Link to={path.historyPurchases} className={cx('ppv-info__link')}>
                      {t('header:purchase')}
                    </Link>
                  </li>
                  <li className={cx('ppv-info__item')}>
                    <button className={cx('ppv-info__link')} onClick={handleLogout}>
                      {t('logout')}
                    </button>
                  </li>
                </ul>
              }
            >
              <img
                src={getAvatarName(profile?.avatar)}
                alt={profile?.name}
                className={cx('header-item__avatar')}
              />
              <span className={cx('header-item__label')}>{profile?.name}</span>
            </Popover>
          )}

          {!isAuthenticated && (
            <div className={cx('header-item__btns-wrap')}>
              <Link to={path.register} className={cx('header-item__btn')}>
                {t('login:register')}
              </Link>
              <span className={cx('header-item__separate')}></span>
              <Link to={path.login} className={cx('header-item__btn')}>
                {t('login:login')}
              </Link>
            </div>
          )}
        </li>
      </ul>
    </div>
  )
}
