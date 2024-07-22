import Footer from 'src/Components/Footer'
import CartHeader from 'src/pages/Cart/Components/CartHeader'

interface Props {
  children: React.ReactNode
}

export default function CartLayout({ children }: Props) {
  return (
    <div>
      <CartHeader />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
