import { Navigate, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { userState } from '../../../../store/user'

export default function RedirectHomeLayout() {
  const user = useRecoilValue(userState)

  if (user) return <Navigate to="/" />

  return <Outlet />
}
