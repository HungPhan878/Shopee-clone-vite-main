/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// components
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import CART_EN from 'src/locales/en/cart.json'
import PROFILE_EN from 'src/locales/en/profile.json'
import LOGIN_EN from 'src/locales/en/login.json'
import HEADER_EN from 'src/locales/en/header.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'
import CART_VI from 'src/locales/vi/cart.json'
import PROFILE_VI from 'src/locales/vi/profile.json'
import LOGIN_VI from 'src/locales/vi/login.json'
import HEADER_VI from 'src/locales/vi/header.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN,
    cart: CART_EN,
    profile: PROFILE_EN,
    login: LOGIN_EN,
    header: HEADER_EN
  },
  vi: {
    // nameSpace default is translate
    //Tự tạo ns riêng để khi có nhiều page và component để dễ quản lý
    home: HOME_VI,
    product: PRODUCT_VI,
    cart: CART_VI,
    profile: PROFILE_VI,
    login: LOGIN_VI,
    header: HEADER_VI
  }
} as const

export const defaultNS = 'home'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  // NS tự tạo thì phải khai báo và cả khai báo defaultNS
  ns: ['home', 'product', 'cart', 'profile', 'login', 'header'],
  defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})

export default i18n
