import * as React from 'react';
import {FC, FormEvent, useCallback} from 'react';
import Input from '../../../components/ui/Input';
import {IUser} from '../../../types/interfaces';
import {useForm} from '../../../misc/hooks';
import {Button} from '../../../components/ui';

interface IAccountFormProps {
    user: IUser;
    onSave: (user: IUser) => void;
}

// eslint-disable-next-line no-warning-comments
// TODO: Добавить feedback результата обновления профиля
// eslint-disable-next-line no-warning-comments
// TODO: Добавить валидатор в useForm
const AccountForm: FC<IAccountFormProps> = ({user, onSave}: IAccountFormProps) => {
    const {values, formFieldChangeHandler} = useForm(user);

    const onSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        onSave(values);
    }, []);

    return <React.Fragment>
        <form className="profile-form" onSubmit={onSubmit}>
            <Input type="text" name="second_name" title="Last Name"
                value={values.second_name} onChange={formFieldChangeHandler}/>

            <Input type="text" name="first_name" title="First Name"
                value={values.first_name} onChange={formFieldChangeHandler}/>

            <Input type="text" name="login" title="Username"
                value={values.login} onChange={formFieldChangeHandler}/>

            <Input type="email" name="email" title="Email"
                value={values.email} onChange={formFieldChangeHandler}/>

            <Input type="tel" name="phone" title="Phone Number"
                value={values.phone} onChange={formFieldChangeHandler}/>

            <Button size="small" aperance="outlined">Save</Button>
        </form>
    </React.Fragment>;
};

export default AccountForm;
