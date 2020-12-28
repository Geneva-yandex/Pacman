import {ChangeEvent, useCallback, useState} from 'react';

export default (initialState: string | number | boolean) => {
    const [value, setValue] = useState(initialState);
    const onChange = useCallback((event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const isCheckedInput = target.tagName === 'RADIO' || target.tagName === 'CHECKBOX';
        const inputValue = isCheckedInput ? target.checked : target.value;
        setValue(inputValue);
    }, []);

    return {value, onChange};
};
