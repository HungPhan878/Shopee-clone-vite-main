import { delay, renderWithRoute } from 'src/utils/testUtils'
import { describe, expect, test } from 'vitest'

describe('ProductDetail', () => {
  test('Hiển thị trang ProductDetail', async () => {
    renderWithRoute({
      route: `/Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-i,60afb2c76ef5b902180aacba`
    })

    await delay(1000)
    // Note:
    // +Đặt matchers ở vite.setup là đủ rồi vì khi chạy test sẽ chạy file setup trước
    // +snapshot là kĩ thuật chụp màn hình dùng để kt xem code của Component trước và sau update
    //  có khác nhau hay không nếu khác chạy test thêm -u sẽ tự update
    expect(document.body).toMatchSnapshot()
  })
})
