import React, {ComponentClass, FunctionComponent} from "react";
import {StorageService} from "../../services/StorageService";

/**
 * HOC, to handle access to app components
 */
export const ProtectionWrapper = () => (WrappedComponent: ComponentClass | FunctionComponent) => {
    return class WithProtection extends React.Component {
        constructor(props: any) {
            super(props);
        }
        //TODO refactor this
        render(): React.ReactNode {
            if (false) {
                // return <LoginPage />;
                return <div />;
            }
            return (<WrappedComponent {...this.props} />);
        }
    };
};
