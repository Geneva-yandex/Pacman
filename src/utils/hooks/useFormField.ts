import {ChangeEvent, useCallback, useState} from 'react';

export default (initialState: any) => {
    const [value, setValue] = useState(initialState);
    const onChange = useCallback((event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        setValue(target.value);
    }, []);

    return {value, onChange};
};
