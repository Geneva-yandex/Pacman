import * as React from 'react';
import {ChangeEvent, FC, useRef} from 'react';
import Input from '../../../components/ui/Input';
import Avatar from '../../../components/ui/Avatar';
import {Button} from '../../../components/ui';

interface IAvatarFormProps {
    avatar: string;
    onSave: (avatar: File) => void;
}

const AvatarForm: FC<IAvatarFormProps> = ({avatar, onSave}: IAvatarFormProps) => {
    const inputEl = useRef<Input>(null);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;

        if (target.files) {
            onSave(target.files[0]);
        }
    };

    return <React.Fragment>
        <Input ref={inputEl} className="visually-hidden" type="file" name="avatar" onChange={onChange} />
        <Avatar src={avatar} />
        <Button type="button" onClick={() => inputEl?.current?.inputRef?.click()}>Загрузить новый</Button>
    </React.Fragment>;
};

export default AvatarForm;
