import { RouteObject, useRoutes } from 'react-router-dom'
import { HomePage } from 'src/app/pages/homepage'

import Todo from '../../pages/todo'
import ProtectedLayout from '../Layouts/ProtectedLayout'
import RedirectHomeLayout from '../Layouts/RedirectHomeLayout'
import NotFound from '../NotFound'

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
     
    ],
  },
  {
    path: '/todo',
    element: <RedirectHomeLayout />,
    children: [
      {
        index: true,
        element: <Todo />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export default function Routes() {
  const routes = useRoutes(routesConfig)
  return routes
}
