// components
import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/Components/Footer'
import RegisterHeader from 'src/Components/RegisterHeader'

interface Props {
  children?: React.ReactNode
}

function RegisterLayoutInner({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      <main>
        {children}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

const RegisterLayout = memo(RegisterLayoutInner)

export default RegisterLayout
