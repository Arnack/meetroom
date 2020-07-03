import React, {ErrorInfo, ReactNode} from 'react';
import ErrorBoundaryInfo from "./ErrorBoundaryInfo";

class ErrorBoundary extends React.Component {
     state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return <>
                <ErrorBoundaryInfo />
            </>;
        }
        return this.props.children;
    }
}
export default ErrorBoundary;