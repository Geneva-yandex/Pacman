import * as React from 'react';
import bem from 'easy-bem';

const b = bem('Modal');

type Props = {
    isClosed: boolean,
    className?: string,
    close: (event: React.MouseEvent<HTMLElement>) => void,
    stateModal: string,
};

export default class Modal extends React.Component<Props> {
    render() {

        const {className, isClosed, close, stateModal} = this.props;

        if (isClosed) {
            return null;
        }

        return (
            <div className={'modal'}>
                <div className={className}>
                    <section className={b('wrapper')}>
                        <div onClick={close} className="close-button" data-modal={stateModal}>X
                        </div>
                        {this.props.children}
                    </section>
                </div>
            </div>
        );
    }
}
