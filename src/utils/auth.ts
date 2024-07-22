import { User } from 'src/types/user.type'

// handle when accesstoken expired
//b1:xuất ra một sự kiện
//b2: bên app lắng nghe sự kiện
//b3:thay đổi trong app context => thay đổi giao diện

export const localStorageEvenTarget = new EventTarget()

export const setAccessTokenFromLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenFromLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const clearLocalStorage = () => {
  const clearLSEvent = new Event('clearLS')
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  // phát ra một sự kiện
  localStorageEvenTarget.dispatchEvent(clearLSEvent)
}

export const setProfileFromLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
