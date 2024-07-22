/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

//scss
import style from './Footer.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(style)

export default function Footer() {
  const { t } = useTranslation(['home'])
  return (
    <footer className={cx('footer')}>
      <div className={cx('container')}>
        {/* top */}
        <div className={cx('row row-cols-5 row-cols-xl-3 row-cols-lg-2 row-cols-md-1')}>
          {/* col1 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>{t('footer.CUSTOMER SERVICE')}</h3>

            <ul className={cx('footer-list')}>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Help Centre')}
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  Shopee blog
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  shopee mall
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.How To Buy')}
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.How To Sell')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Payment')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Shopee Coins')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Shipping')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Return & Refund')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Contact Us')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='/' className={cx('footer-item__link')}>
                  {t('footer.Warranty Policy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* col2 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>{t('footer.ABOUT SHOPEE')}</h3>
            <ul className={cx('footer-list')}>
              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.About Us')}
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.Shopee Careers')}
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.Shopee Policies')}
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.Seller Centre')}
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.Flash Deals')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.Shopee Ambassador Programme')}
                </Link>
              </li>
              <li className={cx('footer-item')}>
                <Link to='#' className={cx('footer-item__link')}>
                  {t('footer.Media Contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* col3 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>{t('footer.Payment')}</h3>

            <ul className={cx('footer-list__wrapper')}>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  {' '}
                  <img
                    src='https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16'
                    alt='logo'
                  ></img>
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  {' '}
                  <img
                    src='https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  {' '}
                  <img
                    src='https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492'
                    alt='logo'
                  />
                </Link>
              </li>
            </ul>

            <h3 className={cx('footer-title')}>{t('footer.LOGISTICS')}</h3>

            <ul className={cx('footer-list__wrapper')}>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/vn-50009109-159200e3e365de418aae52b840f24185'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/d10b0ec09f0322f9201a4f3daf378ed2'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/vn-50009109-64f0b242486a67a3d29fd4bcf024a8c6'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/3900aefbf52b1c180ba66e5ec91190e5'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/6e3be504f08f88a15a28a9a447d94d3d'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/b8348201b4611fc3315b82765d35fc63'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/0b3014da32de48c03340a4e4154328f6'
                    alt='logo'
                  />
                </Link>
              </li>
              <li className='footer-item__inner'>
                <Link
                  to='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-link__inner')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/vn-50009109-ec3ae587db6309b791b78eb8af6793fd'
                    alt='logo'
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* col4 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>{t('footer.FOLLOW US')}</h3>

            <ul className={cx('footer-list')}>
              <li className={cx('footer-item')}>
                <Link
                  to='https://www.facebook.com/ShopeeVN'
                  target='_blank'
                  className={cx('footer-item__link')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/2277b37437aa470fd1c71127c6ff8eb5'
                    alt='facebook'
                    className={cx('footer-item__icon')}
                  />
                  facebook
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link
                  to='https://www.instagram.com/Shopee_VN/'
                  target='_blank'
                  className={cx('footer-item__link')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/5973ebbc642ceee80a504a81203bfb91'
                    alt='instagram'
                    className={cx('footer-item__icon')}
                  ></img>
                  instagram
                </Link>
              </li>

              <li className={cx('footer-item')}>
                <Link
                  to='https://www.linkedin.com/'
                  target='_blank'
                  className={cx('footer-item__link')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/f4f86f1119712b553992a75493065d9a'
                    alt='linkedIn'
                    className={cx('footer-item__icon')}
                  ></img>
                  linkedln
                </Link>
              </li>
            </ul>
          </div>

          {/* col5 */}
          <div className={cx('footer-col')}>
            <h3 className={cx('footer-title')}>{t('footer.SHOPEE APP DOWNLOAD')}</h3>

            <div className={cx('footer-icon__download-inner')}>
              <Link
                to='https://shopee.vn/web'
                target='_blank'
                rel='noopener noreferrer'
                className={cx('footer-icon__download-link-qr')}
              >
                <img
                  src='https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472'
                  alt='download_qr_code'
                />
              </Link>

              <div className={cx('footer-icon__download')}>
                <Link
                  to='https://shopee.vn/web'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-icon__download-link')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163'
                    alt='app'
                  />
                </Link>

                <Link
                  to='https://shopee.vn/web'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-icon__download-link')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def'
                    alt='app'
                  />
                </Link>

                <Link
                  to='https://shopee.vn/web'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cx('footer-icon__download-link')}
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0'
                    alt='app'
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={cx('footer-separate')}></div>

        {/* bottom */}
        <div className={cx('footer-bottom')}>
          <div className={cx('footer-row__wrap')}>
            <div className='row'>
              <div className='col-4 col-xl-12'>
                <p className={cx('footer-label')}>
                  © 2024 Shopee. {t('footer.All rights reserved')}.
                </p>
              </div>
              <div className='col-8 col-xl-12'>
                <p className={cx('footer-label')}>
                  {t(
                    'footer.Country & Region: Singapore Indonesia Thailand Malaysia Vietnam Philippines Brazil Mexico Colombia Chile Taiwan'
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className={cx('footer-bottom__wrap')}>
            <ul className={cx('footer-bottom__list', 'd-md-none')}>
              <li className={cx('footer-bottom__item')}>
                <Link to='#' className={cx('footer-bottom__item-link')}>
                  {t('footer.PRIVACY POLICY')}
                </Link>
              </li>

              <li className={cx('footer-bottom__item')}>
                <Link to='#' className={cx('footer-bottom__item-link')}>
                  {t('footer.OPERATION REGULATIONS')}
                </Link>
              </li>

              <li className={cx('footer-bottom__item')}>
                <Link to='#' className={cx('footer-bottom__item-link')}>
                  {t('footer.SHIPPING POLICY')}
                </Link>
              </li>

              <li className={cx('footer-bottom__item')}>
                <Link to='#' className={cx('footer-bottom__item-link')}>
                  {t('footer.RETURN AND REFUND POLICY')}
                </Link>
              </li>
            </ul>

            <p className={cx('footer-bottom__text', 'footer-bottom__text-mb')}>
              {t('footer.Shopee Company Limited')}
            </p>
            <p className={cx('footer-bottom__text')}>
              {t(
                'footer.Address: Floor 4-5-6, Capital Place Building, 29 Lieu Giai Street, Ngoc Khanh Ward, Ba Dinh District, Hanoi City, Vietnam. Support switchboard: 19001221 - Email: cskh@hotro.shopee.vn'
              )}
            </p>
            <p className={cx('footer-bottom__text')}>
              {t(
                'footer.Responsible for Content Management: Nguyen Duc Tri - Contact phone: 024 73081221 (ext 4678)'
              )}
            </p>
            <p className={cx('footer-bottom__text')}>
              {t(
                'footer.Business code: 0106773786 issued by Hanoi Department of Planning and Investment for the first time on February 10, 2015'
              )}
            </p>
            <p className={cx('footer-bottom__text')}>
              {t('footer.© 2015 - Copyright belongs to Shopee Company Limited')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
