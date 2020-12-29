import * as React from 'react';
import {FC, FormEvent, useCallback} from 'react';
import Input from '../../../components/Input';
import {IUser} from '../../../types/interfaces';
import {useForm} from '../../../utils/hooks';

interface IAccountFormProps {
    user: IUser;
    onSave: (user: IUser) => void;
}

const AccountForm: FC<IAccountFormProps> = ({user, onSave}: IAccountFormProps) => {
    const {formFields, formFieldChangeHandler} = useForm(user);

    const onSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        onSave(formFields);
    }, []);

    return <React.Fragment>
        <form onSubmit={onSubmit}>
            <Input type="text" name="second_name" title="Фамилия"
                value={formFields.second_name} onChange={formFieldChangeHandler}/>

            <Input type="text" name="first_name" title="Имя"
                value={formFields.second_name} onChange={formFieldChangeHandler}/>

            <Input type="text" name="login" title="Логин"
                value={formFields.second_name} onChange={formFieldChangeHandler}/>

            <Input type="email" name="email" title="Почта"
                value={formFields.second_name} onChange={formFieldChangeHandler}/>

            <Input type="tel" name="phone" title="Номер телефона"
                value={formFields.second_name} onChange={formFieldChangeHandler}/>

            <button>Сохранить</button>
        </form>
    </React.Fragment>;
};

export default AccountForm;
