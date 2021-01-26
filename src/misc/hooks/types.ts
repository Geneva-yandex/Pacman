import {ChangeEvent, FormEvent} from 'react';

type FieldChangeCallback = (event: ChangeEvent) => void;
type FormSubmitCallback = (event: FormEvent) => void;

export interface IUseFormProps<T> {
    initialValues: T,
    onSubmit: (values: T) => void
}

export interface IUseForm<T> {
    values: T;
    handleChange: FieldChangeCallback,
    handleSubmit: FormSubmitCallback;
}
