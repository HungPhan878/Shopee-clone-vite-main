import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary.tsx'

// components
import useRouteElements from './hooks/useRouteElements'
import { localStorageEvenTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

// Note:
//+Khi ta sử dụng các hook của react hook form thì khi url thay đổi thì các
// component có sử dụng hook đó sẽ bị re-render lại
//+Đối với mainlayout vì chỉ bị re-render nên getPurchases sẽ không bị gọi lại mà không cần setSaleTime

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    localStorageEvenTarget.addEventListener('clearLS', reset)

    // Nhớ rằng khi listener event thì nhớ remove khi unmount để khỏi bị memory leak bộ nhớ
    return () => {
      localStorageEvenTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <HelmetProvider>
      <ErrorBoundary>
        {routeElements}
        <ToastContainer />
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
