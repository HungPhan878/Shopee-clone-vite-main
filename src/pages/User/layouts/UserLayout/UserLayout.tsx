import { Outlet } from 'react-router-dom'
import classNames from 'classnames/bind'

// scss
import style from './UserLayout.module.scss'

// components
import UserSideNav from '../../Components/UserSideNav'
import { memo } from 'react'

const cx = classNames.bind(style)

function UserLayoutInner() {
  return (
    <main className={cx('wrapper')}>
      <div className='container'>
        <div className='row'>
          <div className='col col-2 col-lg-3 col-md-12'>
            <UserSideNav />
          </div>
          <div className='col col-10 col-lg-9 col-md-12 gy-md-3'>
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}

const UserLayout = memo(UserLayoutInner)

export default UserLayout
