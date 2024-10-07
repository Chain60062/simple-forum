import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { GlobalStyle } from './App.styles'
import ErrorComponent from './pages/error/Error'
import ErrorBoundary from './pages/error/ErrorBoundary'
import routes from './routes.jsx'
import { Loading } from './styles/Loading'
const queryClient = new QueryClient()
const router = createBrowserRouter(routes)

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ErrorBoundary fallback={<ErrorComponent />}>
				<React.StrictMode>
					<GlobalStyle />
					<RouterProvider router={router} fallbackElement={<Loading />} />
					<Toaster
						richColors
						position="top-center"
						toastOptions={{
							style: {
								padding: '1rem',
							},
						}}
					/>
				</React.StrictMode>
			</ErrorBoundary>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default App
