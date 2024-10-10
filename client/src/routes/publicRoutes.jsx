import App from '../App'
import Home from '../pages/home/page'

export const publicRoutes =   {
  path: "/",
  element: <App />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
  ],
}