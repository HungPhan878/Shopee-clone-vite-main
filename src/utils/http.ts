/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'

// components
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'
import {
  clearLocalStorage,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenFromLS,
  setProfileFromLS,
  setRefreshTokenFromLS
} from './auth'
import { AuthResponsive, RefreshTokenResponse } from 'src/types/auth.type'
import config from 'src/constants/config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './util'
import { ErrorResponsiveApi } from 'src/types/util.type'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  // funtion constructor chỉ chạy một lần duy nhất khi được render f5 lại thì sẽ chạy lại
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponsive
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenFromLS(this.accessToken)
          setRefreshTokenFromLS(this.refreshToken)
          setProfileFromLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLocalStorage()
        }
        return response
      },
      (error) => {
        // Không phải lỗi 422 và 401 thì mới nhảy vào đây
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(
            error.response.status as number
          )
        ) {
          const data: any | undefined = error.response.data
          const message = data?.message || error.message
          toast.error(message)
        }

        // Lỗi 401 có nhiều trường hợp
        // +Token hết hạn
        // +Token không được truyền
        // +Token truyền không đúng

        //Lỗi 401
        if (
          isAxiosUnauthorizedError<ErrorResponsiveApi<{ name: string; message: string }>>(error)
        ) {
          const config =
            error.response?.config || ({ headers: {}, url: '' } as InternalAxiosRequestConfig)
          const { url } = config
          //Lỗi 401 với token hết hạn và url !== refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            //Hạn chế call api refresh hai lần
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() =>
                  //Sau 10s mới set lại null để các api khác dùng vẫn được.
                  //Không nên đặt time set null trước time hết hạn của refresh nha.
                  setTimeout(() => (this.refreshTokenRequest = null), 10000)
                )
            return this.refreshTokenRequest.then((accessToken) => {
              return this.instance({
                ...config,
                headers: { ...config.headers, Authorization: accessToken }
              })
            })
          }

          //Lỗi 401 với:
          //+token hết hạn và url === url refresh token
          //+token không đúng
          //+token không được truyền
          clearLocalStorage()
          this.accessToken = ''
          this.refreshToken = ''
          // c1: ta dùng trình lằng nghe sư kiên (EVENT TARGET) để set lại appcontext trả về UI khi chưa login
          // c2: dùng window.location.reload() reload lại UI lấy từ LS thì sẽ trả về UI LOGIN
          // Nhưng sẽ làm mất đi tính chất singlePage applicattion
          toast.error(error.response?.data?.data?.message || error.message)
        }

        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken = () => {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        this.accessToken = access_token
        setAccessTokenFromLS(access_token)
        return access_token
      })
      .catch((error) => {
        clearLocalStorage()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
