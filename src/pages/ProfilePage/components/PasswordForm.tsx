import * as React from 'react';
import Input from '../../../components/ui/Input';
import {useForm} from '../../../misc/hooks';
import {IPsswordsDto} from '../../../types/interfaces';
import {Button} from '../../../components/ui';

interface IPasswordFormProps {
    onSave: (passwords: IPsswordsDto) => void;
}

const PasswordForm = ({onSave}: IPasswordFormProps) => {
    const {values, handleChange, handleSubmit} = useForm<IPsswordsDto>({
        initialValues: {
            oldPassword: '',
            newPassword: ''
        },
        onSubmit: values => onSave(values)
    });

    return <React.Fragment>
        <form className="profile-form" onSubmit={handleSubmit}>
            <Input type="password" name="oldPassword" title="Old Password"
                value={values.oldPassword} onChange={handleChange} />
            <Input type="password" name="newPassword" title="New Password"
                value={values.newPassword} onChange={handleChange} />
            <Button size="small" aperance="outlined">Change password</Button>
        </form>
    </React.Fragment>;
};

export default PasswordForm;
