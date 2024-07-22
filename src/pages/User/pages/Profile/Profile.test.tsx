/* eslint-disable prettier/prettier */
import { waitFor } from '@testing-library/react'
import path from 'src/constants/path'
import { access_token } from 'src/msw/auth.msw'
import { setAccessTokenFromLS } from 'src/utils/auth'
import { renderWithRoute } from 'src/utils/testUtils'
import { describe, expect, test } from 'vitest'

// + khi chạy profile.test.tsx thì sẽ chạy file App trước thì sẽ chạy
//   app.context.ts mà lúc đó chưa có access nên trả về file login
// + Rồi sau đấy mới chạy file test này.

describe('Profile', () => {
  test('Hiển thị trang Profile', async () => {
    setAccessTokenFromLS(access_token)
    const { container } = renderWithRoute({ route: path.profile })

    // await logScreen()

    await waitFor(() => {
      expect(
        (container.querySelector('form input[placeholder="Tên"]') as HTMLInputElement).value
      ).toBe('Rich Grimers 8')
    })
  })
})
