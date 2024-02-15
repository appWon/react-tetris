import _ from "lodash";
import React, {
    Component,
    ComponentType,
    ErrorInfo,
    ReactNode,
    Suspense,
} from "react";

type ErrorBoundaryState = { hasError: boolean };

const withErrorBoundary = <P extends object>(
    Component: ComponentType<P>,
    options: {
        onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    } = {}
): ComponentType<P> => {
    const { onError } = options;

    return class ErrorBoundary extends React.Component<P, ErrorBoundaryState> {
        constructor(props: P) {
            super(props);
            this.state = { hasError: false };
        }

        static getDerivedStateFromError(_: Error) {
            return { hasError: true };
        }

        componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
            if (onError) {
                onError(error, errorInfo);
            }
        }

        render() {
            if (this.state.hasError) {
                return null;
            }

            return <Component {...this.props} />;
        }
    };
};

const withSuspense = (
    Component: ComponentType,
    fallback: NonNullable<React.ReactNode>
) => {
    const WithSuspense = (props: any) => (
        <Suspense fallback={fallback}>
            <Component {...props} />
        </Suspense>
    );

    return WithSuspense;
};

export const withErrorBoundaryAndSuspense = (
    component: ComponentType,
    fallback: NonNullable<React.ReactNode>,
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
) => {
    const WithErrorBoundaryAndSuspense = (props: any) => {
        const ErrorBoundary = onError
            ? withErrorBoundary(component, { onError })
            : withErrorBoundary(component);

        const WithSuspense = withSuspense(ErrorBoundary, fallback);

        return <WithSuspense {...props} />;
    };

    return WithErrorBoundaryAndSuspense;
};
