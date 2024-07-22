import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/Components/Footer'
import Header from 'src/Components/Header'

interface Props {
  children?: React.ReactNode
}

function MainLayoutInner({ children }: Props) {

  return (
    <div>
      <Header />
      <main>
        {children}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

const MainLayout = memo(MainLayoutInner)

export default MainLayout
