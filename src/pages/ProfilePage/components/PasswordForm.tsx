import React from 'react';
import {useForm} from 'common/hooks';
import {IPasswordsDto} from 'common/types/interfaces';
import {Input, Button} from 'components/ui';

interface IPasswordFormProps {
    onSave: (passwords: IPasswordsDto) => void;
}

const PasswordForm = ({onSave}: IPasswordFormProps) => {
    const {values, handleChange, handleSubmit} = useForm<IPasswordsDto>({
        initialValues: {
            oldPassword: '',
            newPassword: ''
        },
        onSubmit: values => onSave(values)
    });

    return <React.Fragment>
        <form className='form' onSubmit={handleSubmit}>
            <Input type='password' name='oldPassword' title='Old Password'
                value={values.oldPassword} onChange={handleChange} />
            <Input type='password' name='newPassword' title='New Password'
                value={values.newPassword} onChange={handleChange} />
            <Button size='small' appearance='outlined'>Change password</Button>
        </form>
    </React.Fragment>;
};

export default PasswordForm;
