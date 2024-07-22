import { beforeEach, describe, expect, it } from 'vitest'
import { Http } from '../http'
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'
import { setAccessTokenFromLS, setRefreshTokenFromLS } from '../auth'
import { access_token_1s, refresh_token_1000000 } from 'src/msw/auth.msw'

//Note:
//Khi test api
//+Không nên dùng f bên file auth.api.ts để khi có thay đổi thì it ảnh hưởng file test

describe('http axios', () => {
  let http = new Http().instance

  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })

  it('Call api and get product', async () => {
    //Dùng async await ở đây để giải quyết quy tắc bất đồng bộ
    //vì lấy ra res status thì cần có res đã chứ đúng không nào
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Auth request and get me', async () => {
    //  Login first để có access truyền vào trong authentication để call get me được
    //  trên thực tế nên dùng 1 account ảo và 1 api riêng để test nha
    await http.post('login', {
      email: 'hungphan@gmail.com',
      password: '789789789'
    })

    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Call function refresh token', async () => {
    //Note:
    //khi xóa setFromls vẫn ok vì ta dùng chung một http trước đó đã thực thi luu vào ram nên
    //vẫn còn dữ liệu => luôn tạo ra một http = new http để có thể luôn có một class mới
    //không bị ảnh hưởng bỏi những lần call api khác.

    setAccessTokenFromLS(access_token_1s)
    setRefreshTokenFromLS(refresh_token_1000000)

    //set value mới rồi gán thì khi chạy class Http chạy f constructor sé lấy trong ls value mới 1 lần thôi nha
    // Nếu lấy trước khi clear thì getLS đã lưu vào ram rồi nha.
    //vì dùng this.access_token gán vào authentication nha.
    const httpNew = new Http().instance

    const res = await httpNew.get('me')
    // console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
