import { Component, type ErrorInfo, type ReactNode } from 'react'
interface ReactProps {
	children?: ReactNode
	fallback?: ReactNode
}
interface State {
	hasError: boolean
}

class ErrorBoundary extends Component<ReactProps, State> {
	constructor(props: ReactProps) {
		super(props)
		this.state = { hasError: false }
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static getDerivedStateFromError(error: Error) {
		return { hasError: true }
	}
	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error(error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback
		}

		return this.props.children
	}
}

export default ErrorBoundary
