import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from './Components/GlobalStyles/'
import { BrowserRouter } from 'react-router-dom'
import 'src/i18n/i18n'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import AppProvider from './contexts/app.context.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // để khi accessToken hết hạn không call api quá nhiều lần
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <App />
          </AppProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </GlobalStyles>
  </React.StrictMode>
)
