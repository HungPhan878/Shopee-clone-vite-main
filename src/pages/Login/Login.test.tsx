import { fireEvent, screen, waitFor } from '@testing-library/react'

import { expect, describe, test, beforeAll } from 'vitest'

// components
import { renderWithRoute } from 'src/utils/testUtils'
import path from 'src/constants/path'

describe('Login', () => {
  let submitForm: HTMLButtonElement
  let emailForm: HTMLInputElement
  let passwordForm: HTMLInputElement

  beforeAll(async () => {
    renderWithRoute({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email/Số điện thoại/Tên đăng nhập')).toBeInTheDocument()

      submitForm = document.querySelector('form button[type="submit"]') as HTMLButtonElement
      emailForm = document.querySelector('form input[type="email"]') as HTMLInputElement
      passwordForm = document.querySelector('form input[type="password"]') as HTMLInputElement
    })
  })

  test('Hiển thị lỗi required when do not enter form', async () => {
    fireEvent.submit(submitForm)

    expect(await screen.findByText('Vui lòng điền email')).toBeTruthy()
    expect(await screen.findByText('Vui lòng điền password')).toBeTruthy()
  })

  test('Hiển thị lỗi không đúng định dạng trên form', async () => {
    fireEvent.input(emailForm, {
      target: {
        value: 'hung@'
      }
    })
    fireEvent.input(passwordForm, {
      target: {
        value: '132'
      }
    })
    fireEvent.submit(submitForm)
    // Khi tìm text xác định không có thì nên dùng query
    // Vì khi không tìm thấy thì query chỉ trả về null không gây lỗi
    // Còn find và get sẽ báo lỗi
    // Và query thì không có trả về promise nên không dùng await thì phải có
    // waitFor để log ra kịp nha
    // Khi test api nen dung mock service worker to khong anh huong den api chinh nha.
    await waitFor(() => {
      expect(screen.queryByText('Nhập email không đúng')).toBeTruthy()
      expect(screen.queryByText('Vui lòng nhập không dưới 6 kí tự')).toBeTruthy()
    })
  })

  test('Không hiển thị lỗi khi nhập value đúng', async () => {
    fireEvent.input(emailForm, {
      target: {
        value: 'hungphan@gmail.com'
      }
    })
    fireEvent.input(passwordForm, {
      target: {
        value: '789789789'
      }
    })
    await waitFor(() => {
      expect(screen.queryByText('Nhập email không đúng')).toBeFalsy()
      expect(screen.queryByText('Vui lòng nhập không dưới 6 kí tự')).toBeFalsy()
    })

    fireEvent.submit(submitForm)

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Shopee Clone | Trang chủ')
    })
  })
})
