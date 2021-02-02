import * as React from 'react';
import bem from 'easy-bem';
import {Link} from 'react-router-dom';
import Modal from '../../components/ui/Modal';
import './StartPage.scss';
import {MouseEvent} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {connect} from 'react-redux';
import fullNameSelector from '../../store/user/selectors';
import {IStoreState} from '../../store/types';

type NavItem = {
    id: number,
    name: string,
    route: string,
    modalControl: string
};

type StateProps = {
    fullName: string;
};

type State = {
    modals: {
        [key: string]: boolean
    }
};

type Props = RouteComponentProps & StateProps;

const b = bem('StartPage');

const startPageNavigation = [
    {
        id: 0,
        name: 'Старт',
        route: '/',
        modalControl: ''
    },
    {
        id: 1,
        name: 'Тренировка',
        route: '/',
        modalControl: ''
    },
    {
        id: 2,
        name: 'Настройки',
        route: '/',
        modalControl: ''
    },
    {
        id: 3,
        name: 'Инструкция',
        route: '',
        modalControl: 'instructionModal'
    }
];

class StartPage extends React.PureComponent<Props, State> {
    private modalWrapperRef = React.createRef<HTMLDivElement>();

    state = {
        modals: {
            instructionModal: true
        }

    };

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
                        {navItem.name}
                    </Link> :
                    <a onClick={e => this.openModal(navItem.modalControl, e)} href='#'>
                        {navItem.name}
                    </a>
                }
            </li>
        );
    }

    render() {
        const {fullName} = this.props;
        return (
            <div className={b()}>
                <div className='container-fluid'>
                    <h1>Start page</h1>
                    <span> Здравствуй, {fullName} </span>
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

const mapStateToProps = (state: IStoreState): StateProps => ({
    fullName: fullNameSelector(state)
});
export default withRouter(connect(mapStateToProps, null)(StartPage));

