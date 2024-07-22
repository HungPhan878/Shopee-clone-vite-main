/* eslint-disable react-refresh/only-export-components */
/* eslint-disable prettier/prettier */
import { createContext, useState } from 'react'
import { ExtendedPurchases } from 'src/types/purchases.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchases[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchases[]>>
  reset: () => void
}

export const getDefaultValueContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null
})

const initialAppContext: AppContextInterface = getDefaultValueContext()

export const AppContext = createContext<AppContextInterface>(initialAppContext)

function AppProvider({
  children,
  defaultValue = initialAppContext
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(defaultValue.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(defaultValue.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>(
    defaultValue.extendedPurchases
  )
  // Tạo f để lấy ra ba set cho tiện
  // Khi co ts thi nen gan ? in ts
  const reset = () => {
    setAuthenticated(false)
    setProfile(null)
    setExtendedPurchases([])
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
