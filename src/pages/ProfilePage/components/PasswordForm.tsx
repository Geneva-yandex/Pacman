import * as React from 'react';
import {FC, FormEvent, useCallback} from 'react';
import Input from '../../../components/Input';
import {useFormField} from '../../../utils/hooks';
import {IPasswordRequest} from '../../../types/interfaces';

interface IPasswordFormProps {
    onSave: (passwords: IPasswordRequest) => void;
}

const PasswordForm: FC<IPasswordFormProps> = ({onSave}: IPasswordFormProps) => {
    const oldPasswordField = useFormField('');
    const newPasswordField = useFormField('');

    const onSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        onSave({
            oldPassword: oldPasswordField.value as string,
            newPassword: newPasswordField.value as string
        });
    }, []);

    return <React.Fragment>
        <form onSubmit={onSubmit}>
            <Input type="text" name="oldPassword" title="Старый пароль" {...oldPasswordField} />
            <Input type="text" name="newPassword" title="Новый пароль" {...newPasswordField} />

            <button>Поменять пароль</button>
        </form>
    </React.Fragment>;
};

export default PasswordForm;
