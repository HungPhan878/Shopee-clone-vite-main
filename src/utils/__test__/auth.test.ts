/* eslint-disable prettier/prettier */
import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearLocalStorage,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenFromLS,
  setRefreshTokenFromLS
} from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0yMVQxNDoyNTowMi40ODFaIiwiaWF0IjoxNzE4OTc5OTAyLCJleHAiOjE3MTk1ODQ3MDJ9.Mpt47FK4kZgOaaNi_SBCyeP3C6nhexN8_PjVwiFxzAs'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0yMVQxNDoyNTowMi40ODFaIiwiaWF0IjoxNzE4OTc5OTAyLCJleHAiOjE3Mjc2MTk5MDJ9.yj67fWu0FFy-o-uM39l3qAeEb2m02fXJNbDqvrWLaO0'

// const profile =
//   '{"_id":"660dfae7a71a6c029dec325b","roles":["User"],"email":"hungphan@gmail.com","createdAt":"2024-04-04T00:57:11.695Z","updatedAt":"2024-06-14T14:03:38.619Z","__v":0,"avatar":"9b82bbf8-8df0-44f6-8ca3-15e1357877f8.jpg","name":"Rich Grimers 8","address":"Vũng thùng 1 khu B 107","date_of_birth":"1999-09-16T17:00:00.000Z","phone":"0934940535"}'

// Note:
//+Vitest là test trên env terminal để sử dụng cú pháp api browser thì ta cần cài jsdom
//để chuyên env node thành jsdom để test.
//+toBe: là so sánh cả tham chiếu và tham trị nữa
//+Equal chỉ so sánh value trong ô nhớ mà thôi
//+beforeEach: là f có chức năng gọi trước khi decribe hay it thực thi

// f ở đay gọi trước khi decribe thực thi vì ở phạm vi ngoài decribe mà
// nếu trong decribe thì trước khi mỗi it thực thi.
beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('Set and get access_token from localStorage', () => {
    setAccessTokenFromLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('refresh_token', () => {
  it('Set and get refresh_token from localStorage', () => {
    setRefreshTokenFromLS(refresh_token)
    expect(getRefreshTokenFromLS()).toEqual(refresh_token)
  })
})

describe('clearLocalStorage', () => {
  it('Clear localStorage', () => {
    setAccessTokenFromLS(access_token)
    setRefreshTokenFromLS(refresh_token)
    clearLocalStorage()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
  })
})
