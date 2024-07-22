import { HttpResponse, http } from 'msw'
import config from 'src/constants/config'
import { URL_REFRESH_TOKEN } from 'src/apis/auth.api'

export const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0yMlQxMzozMzo0MC44NjVaIiwiaWF0IjoxNzE5MDYzMjIwLCJleHAiOjE3MTkwNjMyMjF9.3r2eE0XL7sAy1_nRjyqPjJCr07IlcyrFJRrCwuZZn34'
export const refresh_token_1000000 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0yMlQxMzo1NDo0Ny4wODFaIiwiaWF0IjoxNzE5MDY0NDg3LCJleHAiOjE3MjkwNjQ0ODd9.vRmVUZJYS7DcSInMCur7wqi9U7Ohd_X4Y0xnRgFJuoc'
export const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0yOFQxNTo0Njo1OC44MzNaIiwiaWF0IjoxNzE5NTg5NjE4LCJleHAiOjE3MjA1ODk2MTh9.CCmwPAQNbMbKT9E89uNFiBGuRqSrnRg9x2GeGD-Izx4'

const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0yNlQxNDozMDoyMC4zMTFaIiwiaWF0IjoxNzE5NDEyMjIwLCJleHAiOjE3MTk0MjIyMjB9.w7AtSboxO8Lmwv6mQ8ix7jpuo9RuTf0euIBwYVr_qFU',
    expires: 10000,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0yNlQxNDozMDoyMC4zMTFaIiwiaWF0IjoxNzE5NDEyMjIwLCJleHAiOjE3Mjk0MTIyMjB9.TFdldAb-XmdZw4hbVjFgFVURImC_5Hxy8PQXyPs2P-Q',
    expires_refresh_token: 10000000,
    user: {
      _id: '660dfae7a71a6c029dec325b',
      roles: ['User'],
      email: 'hungphan@gmail.com',
      createdAt: '2024-04-04T00:57:11.695Z',
      updatedAt: '2024-06-14T14:03:38.619Z',
      __v: 0,
      avatar: '9b82bbf8-8df0-44f6-8ca3-15e1357877f8.jpg',
      name: 'Rich Grimers 7',
      address: 'Vũng thùng 1 khu B 107',
      date_of_birth: '1999-09-16T17:00:00.000Z',
      phone: '0934940535'
    }
  }
}

const refreshTokenRes = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0yN1QxNDoxNTo0MC4xNzZaIiwiaWF0IjoxNzE5NDk3NzQwLCJleHAiOjE3MjAxMDI1NDB9.QrcAUCcPSPSkzBEn5uDj9f2t6vH9oEmLx1wva4eSS2U'
  }
}

export const loginRequest = http.post(`${config.baseURL}login`, () => {
  return HttpResponse.json(loginRes)
})

export const refreshTokenRequest = http.post(`${config.baseURL}${URL_REFRESH_TOKEN}`, () => {
  return HttpResponse.json(refreshTokenRes)
})

const authRequests = [loginRequest, refreshTokenRequest]

export default authRequests
