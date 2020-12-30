import * as React from 'react';
import bem from 'easy-bem';
import {Link} from 'react-router-dom';
import checkForAuthOrRedirect from '../../misc/utils/checkForAuthOrRedirect';
import Modal from '../../components/ui/Modal';
import './StartPage.scss';
import {MouseEvent} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {Button} from '../../components/ui';

type navItem = {
    id: number,
    name: string,
    route: string,
    modalControl: string,
    primary: boolean
};

const b = bem('StartPage');

class StartPage extends React.PureComponent<RouteComponentProps> {
    private modalWrapperRef = React.createRef<HTMLDivElement>();

    state = {
        user: {},
        pages: [
            {
                id: 0,
                name: 'Старт',
                route: '/',
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
        ],
        modals: {
            instructionModal: true
        }

    };

    componentDidMount() {
        checkForAuthOrRedirect('/login')
            .then(res => {
                this.setState({
                    user: res.user
                });
            })
            .catch(() => {
                this.props.history.push('/login');
            });
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
        let target = e.target;
        if (target !== null) {
            let modalName = (e.target as HTMLElement).getAttribute('data-modal');
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

    renderNavItems(navItem: navItem) {
        if (navItem.route) {
            return (
                <li key={navItem.id} className={b('navigation-item')}>
                    <Link to={navItem.route}>
                        <Button aperance={navItem.primary ? 'primary' : 'outlined'}>{navItem.name}</Button>
                    </Link>
                </li>
            );
        }

        return (
            <li key={navItem.id} className={b('navigation-item')}>
                <Button aperance="outlined" onClick={e => this.openModal(navItem.modalControl, e)}>{navItem.name}</Button>
            </li>
        );
    }

    render() {
        return (
            <div className={b()}>
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
                <div onClick={this.closeAllModals} className={'modals-wrapper'} ref={this.modalWrapperRef}>
                    <Modal stateModal="instructionModal" close={e => this.closeModal(e)}
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
export default withRouter(StartPage);
