const path = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  product: ':nameId',
  cart: '/cart',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchases: '/user/purchases'
} as const

export default path
