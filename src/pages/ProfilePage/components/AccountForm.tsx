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

// TODO: Добавить feedback результата обновления профиля
// TODO: Добавить валидатор в useForm
const AccountForm: FC<IAccountFormProps> = ({user, onSave}: IAccountFormProps) => {
    console.log(user);
    const {values, formFieldChangeHandler} = useForm(user);
    console.log(values);

    const onSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        onSave(values);
    }, []);

    return <React.Fragment>
        <form className="profile-form" onSubmit={onSubmit}>
            <Input type="text" name="second_name" title="Фамилия"
                value={values.second_name} onChange={formFieldChangeHandler}/>

            <Input type="text" name="first_name" title="Имя"
                value={values.first_name} onChange={formFieldChangeHandler}/>

            <Input type="text" name="login" title="Логин"
                value={values.login} onChange={formFieldChangeHandler}/>

            <Input type="email" name="email" title="Почта"
                value={values.email} onChange={formFieldChangeHandler}/>

            <Input type="tel" name="phone" title="Номер телефона"
                value={values.phone} onChange={formFieldChangeHandler}/>

            <Button size="small" aperance="outlined">Сохранить</Button>
        </form>
    </React.Fragment>;
};

export default AccountForm;
