import { useState } from 'react';
export const useProduct = () => {
    const [counter, setCounter] = useState(0);

    const handleChange = (value:number = 1) => {
        setCounter(prev=>Math.max(0, prev + value));
    }

    return {counter, handleChange}
}
