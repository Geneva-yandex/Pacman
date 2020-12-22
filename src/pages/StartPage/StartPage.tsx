import * as React from 'react';
import bem from 'easy-bem';
import {Link} from 'react-router-dom';
import checkForAuthOrRedirect from '../../utils/checkForAuthOrRedirect';
import {Redirect} from 'react-router';
import Modal from '../../components/Modal';
import './StartPage.scss';
import {MouseEvent} from 'react';

type OwnProps = {}
type Props = OwnProps;

type userData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    avatar: string;
    phone: string;
};

type navItem = {
    id: number,
    name: string,
    route: string,
    modalControl: string
}

const b = bem('StartPage');

export default class StartPage extends React.PureComponent<Props> {
    private modalWrapperRef = React.createRef<HTMLDivElement>();
    user: userData | null;

    state = {
        user: {},
        redirectUrl: '',
        pages: [
            {
                id: 0,
                name: 'Старт',
                route: '/',
                modalControl: '',
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
                modalControl: 'instructionModal',
            },
        ],
        modals: {
            instructionModal: true,
        }

    };

    componentDidMount() {
        checkForAuthOrRedirect('/login')
            .then(res => {
                this.setState({
                    user: res.user
                })
            })
            .catch(err => {
                this.setState({
                    redirectUrl: err.redirectUrl
                })
            })
    }

    toggleClassListOfModalWrapper() {
        let modalWrapper = this.modalWrapperRef.current;
        if (modalWrapper !== null) {
            modalWrapper.classList.toggle('active');
        }
    }

    closeAllModals = (event: React.SyntheticEvent) => {
        let eventTarget = event.target;
        if (!(eventTarget as HTMLElement).classList.contains('modals-wrapper')) {
            return;
        }
        const allModals : {[index: string]: boolean} = this.state.modals;
        for(let key in allModals) {
            allModals[key] = true
        }

        this.setState({
            modals: {
                ...allModals
            }
        })
        this.toggleClassListOfModalWrapper();
    }

    openModal(modalName: string, event: MouseEvent) {
        event.preventDefault();
        this.setState({
            modals: {
                ...this.state.modals,
                [modalName]: false,
            }
        })
        this.toggleClassListOfModalWrapper();

    }

    closeModal(e: React.MouseEvent) {
        let target = e.target;
        if (target !== null) {
            let modalName = (e.target as HTMLElement).getAttribute('data-modal');
            console.log(modalName);
            if (modalName !== null) {
                this.setState({
                    modals: {
                        ...this.state.modals,
                        [modalName]: true,
                    }
                })
                this.toggleClassListOfModalWrapper()

            }
        }
    }

    renderNavItems(navItem: navItem) {
        if (navItem.route) {
            return (
                <li key={navItem.id} className={b('navigation-item')}>
                    <Link to={navItem.route}>
                        {navItem.name}
                    </Link>
                </li>
            );
        } else {
            return (
                <li key={navItem.id} className={b('navigation-item')}>
                    <a onClick={(e) => this.openModal(navItem.modalControl, e)} href="#">
                        {navItem.name}
                    </a>
                </li>
            )
        }
    }

    render() {
        if (this.state.redirectUrl) {
            return <Redirect to={this.state.redirectUrl}/>;
        }
        return (
            <div className={b()}>
                <div className={'container-fluid'}>
                    <h1>Start page</h1>
                    <div className={b('navigation-wrapper')}>
                        <nav className={b('navigation')}>
                            <ul className={b('navigation-list')}>
                                {
                                    this.state.pages
                                        .map(page => this.renderNavItems(page))
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
                <div onClick={this.closeAllModals} className={'modals-wrapper'} ref={this.modalWrapperRef}>
                    <Modal stateModal="instructionModal" close={(e) => this.closeModal(e)}
                           className={'instruction-modal'} isClosed={this.state.modals.instructionModal}>
                        <h3 className={'modal-default-title'}>
                            Заголовок инстукции
                        </h3>
                        <div className={'modal-default-text-box'}>
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
