import * as React from 'react';
import bem from 'easy-bem';

const b = bem('Modal')

type OwnProps = {
    isClosed: boolean,
    className?: string,
    close: (event: React.MouseEvent<HTMLElement>) => void,
    stateModal: string,
}

type Props = OwnProps;

export default class Modal extends React.Component<Props> {
    render() {
        if (this.props.isClosed) {
            return '';
        }
        return (
            <div className={'modal'}>
                <div className={this.props.className}>
                    <section className={b('wrapper')}>
                        <div onClick={this.props.close} className="close-button" data-modal={this.props.stateModal}>X
                        </div>
                        {this.props.children}
                    </section>
                </div>
            </div>
        )
    }
}