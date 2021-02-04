import React from 'react';
import {IUser} from 'types/interfaces';
import {useForm} from 'misc/hooks';
import {Input, Button} from 'components/ui';

interface IAccountFormProps {
    user: IUser | null;
    onSave: (user: IUser) => void;
}

const AccountForm = ({user, onSave}: IAccountFormProps) => {
    const {values, handleChange, handleSubmit} = useForm<IUser>({
        initialValues: user,
        onSubmit: (values: IUser) => onSave(values)
    });

    return <React.Fragment>
        <form className='form' onSubmit={handleSubmit}>
            <Input type='text' name='second_name' title='Last Name'
                value={values.second_name} onChange={handleChange}/>

            <Input type='text' name='first_name' title='First Name'
                value={values.first_name} onChange={handleChange}/>

            <Input type='text' name='login' title='Login'
                value={values.login} onChange={handleChange}/>

            <Input type='text' name='display_name' title='Display Name'
                value={values.display_name} onChange={handleChange}/>

            <Input type='email' name='email' title='Email'
                value={values.email} onChange={handleChange}/>

            <Input type='tel' name='phone' title='Phone Number'
                value={values.phone} onChange={handleChange}/>

            <Button size='small' aperance='outlined'>Save</Button>
        </form>
    </React.Fragment>;
};

export default AccountForm;
