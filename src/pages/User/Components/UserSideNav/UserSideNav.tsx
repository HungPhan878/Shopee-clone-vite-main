/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// scss
import style from './UserSideNav.module.scss'

// components
import { AppContext } from 'src/contexts/app.context'
import { getAvatarName } from 'src/utils/util'
import path from 'src/constants/path'

const cx = classNames.bind(style)

export default function UserSideNav() {
  const { t } = useTranslation(['profile']) //dùng ns nào thì khai báo cụ thể ra
  const { profile } = useContext(AppContext)

  return (
    <div>
      <div className={cx('nav__row')}>
        <div className={cx('nav-img__wrap')}>
          <img
            src={getAvatarName(profile?.avatar)}
            alt={profile?.name}
            className={cx('nav-img__avatar')}
          />
        </div>
        <div className={cx('nav-info')}>
          <div className={cx('nav-info__name')}>{profile?.name}</div>
          <NavLink to={path.profile} className={cx('nav-info__link')}>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            {t('user side nav.edit profile')}
          </NavLink>
        </div>
      </div>

      <ul className={cx('nav__list')}>
        <li className={cx('nav-item')}>
          <NavLink
            to={path.profile}
            className={({ isActive }) =>
              cx('nav-item__link', {
                'nav-item__link--active': isActive
              })
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className={cx('nav-item__icon')}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
              />
            </svg>
            {t('user side nav.my account')}
          </NavLink>
        </li>
        <li className={cx('nav-item')}>
          <NavLink
            to={path.changePassword}
            className={({ isActive }) =>
              cx('nav-item__link', {
                'nav-item__link--active': isActive
              })
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className={cx('nav-item__icon')}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
              />
            </svg>
            {t('user side nav.change password')}
          </NavLink>
        </li>
        <li className={cx('nav-item')}>
          <NavLink
            to={path.historyPurchases}
            className={({ isActive }) =>
              cx('nav-item__link', {
                'nav-item__link--active': isActive
              })
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className={cx('nav-item__icon')}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
              />
            </svg>
            {t('user side nav.purchase orders')}
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
