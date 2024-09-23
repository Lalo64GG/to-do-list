import { useState } from 'react';

export const useInputValidation = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const [isInvalid, setIsInvalid] = useState(false);

    const validate = () => {
        if (!value.trim()) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
        }
    };

    return {
        value,
        setValue,
        isInvalid,
        validate,
    };
};
