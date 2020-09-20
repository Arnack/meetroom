import React, {ErrorInfo, ReactNode} from 'react';
import ErrorBoundaryInfo from "./ErrorBoundaryInfo";

class ErrorBoundary extends React.Component {
     state = {
         hasError: false,
         errorInfo: undefined
     };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
        this.setState({ errorInfo })
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return <>
                <ErrorBoundaryInfo errInfo={this.state.errorInfo} />
            </>;
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
