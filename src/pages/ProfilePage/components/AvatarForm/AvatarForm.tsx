import * as React from 'react';
import {ChangeEvent, FC, useRef} from 'react';
import bem from 'easy-bem';
import Input from '../../../../components/ui/Input';
import Avatar from '../../../../components/ui/Avatar';
import {Button} from '../../../../components/ui';
import './AvatarForm.scss';

interface IAvatarFormProps {
    avatar: string;
    onSave: (avatar: File) => void;
}

const b = bem('AvatarForm');

const AvatarForm: FC<IAvatarFormProps> = ({avatar, onSave}: IAvatarFormProps) => {
    const inputEl = useRef<Input>(null);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;

        if (target.files) {
            onSave(target.files[0]);
        }
    };

    return <React.Fragment>
        <div className={b()}>
            <div className={b('photo')}>
                <Input ref={inputEl} className="visually-hidden" type="file" name="avatar" onChange={onChange} />
                <Avatar size={120} src={avatar} />
            </div>

            <Button size="small" aperance="outlined" type="button" onClick={() => inputEl?.current?.inputRef?.click()}>Загрузить новый</Button>
        </div>
    </React.Fragment>;
};

export default AvatarForm;
