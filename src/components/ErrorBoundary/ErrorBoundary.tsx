import {IErrorBoundaryState} from './types';
import * as React from 'react';
import './ErrorBoundary.scss';
import bem from 'easy-bem';

const b = bem('ErrorBoundary');
export default class ErrorBoundary extends React.Component<{}, IErrorBoundaryState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={b()}>
                    <div className={'container-fluid'}>
                        <h1>Что-то пошло не так :(</h1>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
