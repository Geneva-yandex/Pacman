import React, {MouseEvent} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import bem from 'easy-bem';
import {Modal, Button} from 'components/ui';
import './StartPage.scss';

type NavItem = {
    id: number,
    name: string,
    route: string,
    modalControl: string,
    primary: boolean
};

const b = bem('StartPage');

const startPageNavigation = [
    {
        id: 0,
        name: 'Старт',
        route: '/game',
        modalControl: '',
        primary: true
    },
    {
        id: 1,
        name: 'Тренировка',
        route: '/',
        modalControl: '',
        primary: false
    },
    {
        id: 2,
        name: 'Инструкция',
        route: '',
        modalControl: 'instructionModal',
        primary: false
    }
];

class StartPage extends React.PureComponent<RouteComponentProps, State> {
    private modalWrapperRef = React.createRef<HTMLDivElement>();

    state = {
        modals: {
            instructionModal: true
        }

    };

    constructor(props: RouteComponentProps) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    toggleClassListOfModalWrapper() {
        const modalWrapper = this.modalWrapperRef.current;
        if (modalWrapper !== null) {
            modalWrapper.classList.toggle('active');
        }
    }

    closeAllModals = (event: React.SyntheticEvent) => {
        const eventTarget = event.target;
        if (!(eventTarget as HTMLElement).classList.contains('modals-wrapper')) {
            return;
        }

        const allModals: { [index: string]: boolean } = this.state.modals;
        for (let key in allModals) {
            allModals[key] = true;
        }

        this.setState({
            modals: {
                ...allModals
            }
        });
        this.toggleClassListOfModalWrapper();
    };

    openModal(modalName: string, event: MouseEvent) {
        event.preventDefault();
        this.setState({
            modals: {
                ...this.state.modals,
                [modalName]: false
            }
        });
        this.toggleClassListOfModalWrapper();
    }

    closeModal(e: React.MouseEvent) {
        const target = e.target;
        if (target !== null) {
            const modalName = (e.target as HTMLElement).getAttribute('data-modal');
            if (modalName !== null) {
                this.setState({
                    modals: {
                        ...this.state.modals,
                        [modalName]: true
                    }
                });
                this.toggleClassListOfModalWrapper();
            }
        }
    }

    renderNavItems(navItem: NavItem) {
        return (
            <li key={navItem.id} className={b('navigationItem')}>
                {navItem.route ?
                    <Link to={navItem.route}>
                        <Button apperance={navItem.primary ? 'primary' : 'outlined'}>{navItem.name}</Button>
                    </Link> :
                    <Button apperance='outlined' onClick={e => this.openModal(navItem.modalControl, e)}>{navItem.name}</Button>
                }
            </li>
        );
    }

    render() {
        return (
            <div className={b()}>
                <div className={b('navigation-wrapper')}>
                    <nav className={b('navigation')}>
                        <ul className={b('navigationList')}>
                            {
                                startPageNavigation
                                    .map(page => this.renderNavItems(page))
                            }
                        </ul>
                    </nav>
                </div>
                <div onClick={this.closeAllModals} className='modals-wrapper' ref={this.modalWrapperRef}>
                    <Modal stateModal='instructionModal' close={this.closeModal}
                        className='instruction-modal' isClosed={this.state.modals.instructionModal}>
                        <h3 className='modal-default-title'>
                            Заголовок инстукции
                        </h3>
                        <div className='modal-default-text-box'>
                            <p>
                                Инструкция Инструкция Инструкция Инструкция
                            </p>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default withRouter(StartPage);
