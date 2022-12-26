import { Navigate, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { userState } from '../../../../store/user'

export default function ProtectedLayout() {
  const user = useRecoilValue(userState)

  if (!user) return <Navigate to="/login" />

  return <Outlet />
}
