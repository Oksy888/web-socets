import '@mantine/core/styles.css'
import 'mantine-flagpack/styles.css'
import 'react-toastify/dist/ReactToastify.css'
import './core/i18n'

import { lazy, Suspense } from 'react'
import { MantineProvider } from '@mantine/core'
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from './features/ErrorBoundary/components/errorBoundary'
import { ToastContainer, Flip } from 'react-toastify'
import { mantineTheme } from './core/theme/mantine-theme'
import { Environment } from './core/environment'
import { Loading } from './features/loader/Loading'
import { MainPage } from './features/MainPage'
//import Chat from './features/chat'
import Home from './features/home/Home'

const Chat = lazy(() => import('./features/chat'))

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0,
    },
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    //loader: () => <Loading />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/chat',
        element: (
          <Suspense fallback={<Loading />}>
            <Chat />
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorBoundary />,
  },

  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export default function App() {
  return (
    // <Suspense fallback="...is loading">
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        forceColorScheme="dark"
        theme={mantineTheme}
        stylesTransform={emotionTransform}
      >
        <MantineEmotionProvider>
          <RouterProvider router={router} />
          <ToastContainer
            stacked
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Flip}
          />
        </MantineEmotionProvider>
      </MantineProvider>
      {Environment.isDev && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
      )}
    </QueryClientProvider>
    // </Suspense>
  )
}
