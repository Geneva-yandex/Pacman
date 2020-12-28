import {ChangeEvent, useCallback, useState} from 'react';

export default <T>(initialState: T) => {
    const [value, setValue] = useState(initialState);

    const formFieldChangeHandler = useCallback((event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const isCheckedInput = target.tagName === 'RADIO' || target.tagName === 'CHECKBOX';
        const inputValue = isCheckedInput ? target.checked : target.value;

        setValue({
            ...value,
            [target.name]: inputValue
        });
    }, []);

    return {formFields: value, formFieldChangeHandler};
};
