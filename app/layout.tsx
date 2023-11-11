import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import ClientOnly from './component/ClientOnly'
import Navbar from './component/navbar/Navbar'
import RegisterModal from './component/modal/RegisterModal'
import ToasterProvider from './component/provider/ToasterProvider'
import LoginModal from './component/modal/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './component/modal/RentModal'
import SearchModal from './component/modal/SearchModal'


export const metadata: Metadata = {
  title: 'Healing',
  description: 'travel and Resort',
}


const font = Nunito({
  subsets: ["latin"]
})


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <RegisterModal />
          <SearchModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
       
      </body>
    </html>
  )
}
