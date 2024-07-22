/* eslint-disable import/no-named-as-default */
/* eslint-disable prettier/prettier */
import { screen, waitFor } from '@testing-library/react'
import { expect, describe, test } from 'vitest'

// components
import path from './constants/path'
import { renderWithRoute } from './utils/testUtils'
// import { logScreen } from './utils/testUtils'

describe('App', () => {
  test('render app và chuyển trang', async () => {
    // const user = userEvent.setup()

    const { user } = renderWithRoute()

    // Verify Trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Shopee Clone | Trang chủ')
      expect(screen.getByText('sắp xếp theo')).toBeInTheDocument()
    })

    // Verify trang login
    await user.click(screen.getByText(/đăng nhập/i))

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Shopee Clone | Đăng Nhập')
    })
  })

  test('Not found', async () => {
    const badRoute = '/some/bad/route'

    renderWithRoute({ route: badRoute })

    // Verify trang not found
    await waitFor(() => {
      expect(screen.getByText('The stuff you were looking for does not exist')).toBeInTheDocument()
    })

    // screen.debug(document.body.parentElement as HTMLElement, 888888)

    // await logScreen()
  })

  test('Page Register', async () => {
    renderWithRoute({ route: path.register })

    // Verify trang register khi enter
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Shopee Clone | Đăng Ký')
      expect(screen.getByText('Bạn đã có tài khoản?')).toBeInTheDocument()
    })

    screen.debug(document.body.parentElement as HTMLElement, 888888)
  })
})
