import React, {ComponentClass, FunctionComponent} from "react";
import {StorageService} from "../../services/StorageService";
import LoginPage from "../../components/login/LoginPage";

/**
 * HOC, to handle access to app components
 */
export const ProtectionWrapper = () => (WrappedComponent: ComponentClass | FunctionComponent) => {
    return class WithProtection extends React.Component {
        constructor(props: any) {
            super(props);
        }
        render(): React.ReactNode {
            if (!StorageService.isLoggedIn()) {
                return <LoginPage />;
            }
            return (<WrappedComponent {...this.props} />);
        }
    };
};
