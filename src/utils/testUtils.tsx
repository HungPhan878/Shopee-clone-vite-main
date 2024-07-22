import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

// components
import App from 'src/App'
import AppProvider, { getDefaultValueContext } from 'src/contexts/app.context'

export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

// export const logScreen = async (
//   body: HTMLElement = document.body.parentElement as HTMLElement,
//   options?: waitForOptions
// ) => {
//   const { timeout = 1000 } = options || {}

//   await waitFor(
//     async () => {
//       expect(await delay(timeout - 100)).toBe(true)
//     },
//     {
//       ...options,
//       timeout
//     }
//   )

//   screen.debug(body, 888888)
// }

// Cấu hình queryClient riêng cho unittest
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    }
  })

  const Provider = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }

  return Provider
}

const Provider = createWrapper()

export const renderWithRoute = ({ route = '/' } = {}) => {
  // Dùng MemoryRoute mới truyền path vào được thì có cách hai là
  // Dùng pushState vào là ok
  window.history.pushState({}, 'Test page', route)
  const valueContext = getDefaultValueContext()

  return {
    user: userEvent.setup(),
    ...render(
      <Provider>
        <AppProvider defaultValue={valueContext}>
          <App />
        </AppProvider>
      </Provider>,
      { wrapper: BrowserRouter }
    )
  }
}
