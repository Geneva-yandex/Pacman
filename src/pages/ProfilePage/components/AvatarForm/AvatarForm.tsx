import React, {ChangeEvent, useRef} from 'react';
import bem from 'easy-bem';
import {Input, Button, Avatar} from 'components/ui';
import {API_ENDPOINT} from 'common/constants';
import './AvatarForm.scss';

interface IAvatarFormProps {
    avatar: string | undefined;
    onSave: (avatar: File) => void;
}

const b = bem('AvatarForm');

const AvatarForm = ({avatar, onSave}: IAvatarFormProps) => {
    const inputEl = useRef<Input>(null);
    const avatarSrc = `${API_ENDPOINT}/${avatar}`;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;

        if (target.files) {
            onSave(target.files[0]);
        }
    };

    return <React.Fragment>
        <div className={b()}>
            <div className={b('photo')}>
                <Input ref={inputEl} className='visually-hidden' type='file' name='avatar' onChange={onChange} />
                <Avatar size={120} src={avatarSrc} />
            </div>

            <Button size='small' aperance='outlined' type='button' onClick={() => inputEl?.current?.inputRef?.click()}>Change avatar</Button>
        </div>
    </React.Fragment>;
};

export default AvatarForm;
