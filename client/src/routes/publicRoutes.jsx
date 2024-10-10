import App from '../App'
import Home from '../pages/_public/home/page'
import About from '../pages/_public/about/page'
import Contact from '../pages/_public/contact/page'
import SignIn from '../pages/_public/signin/page'
import SignUp from '../pages/_public/signup/page'

export const PublicRoutes =  [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]