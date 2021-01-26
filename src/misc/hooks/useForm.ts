import {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import {IUseForm, IUseFormProps} from './types';

export default <T = unknown>({initialValues, onSubmit}: IUseFormProps<T>): IUseForm<T> => {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = useCallback((event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const isCheckedInput = target.tagName === 'RADIO' || target.tagName === 'CHECKBOX';
        const inputValue = isCheckedInput ? target.checked : target.value;

        setValues({
            ...values,
            [target.name]: inputValue
        });
    }, []);

    const handleSubmit = (event: FormEvent) => {
        if (event) {
            event.preventDefault();
        }

        onSubmit(values);
    };

    return {values, handleChange, handleSubmit};
};
