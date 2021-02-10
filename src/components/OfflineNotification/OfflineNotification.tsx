import * as React from 'react';
import bem from 'easy-bem';
import {Button} from '../ui';
import './OfflineNotification.scss';

const b = bem('OfflineNotification');

export default class OfflineNotification extends React.PureComponent {
    render() {
        return !navigator.onLine && (
            <div className={b()}>
                <div className='container-fluid'>
                    <div className={b('notification')}>
                        <h2>You are offline &#128683;</h2>
                        <p>
                            Some requests will be unavailable &#128560;
                            <br/>
                            Click the button below to try reloading.
                        </p>
                        <Button onClick={() => window.location.reload()}>
                            &#128260; Reload
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
