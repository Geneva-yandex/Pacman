import {ChangeEvent, useCallback, useState} from 'react';

export default <T = unknown>(initialState: T) => {
    const [values, setValue] = useState(initialState);

    const formFieldChangeHandler = useCallback((event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const isCheckedInput = target.tagName === 'RADIO' || target.tagName === 'CHECKBOX';
        const inputValue = isCheckedInput ? target.checked : target.value;

        setValue({
            ...values,
            [target.name]: inputValue
        });
    }, []);

    return {values, formFieldChangeHandler};
};
