import { useEffect } from 'react';

interface SharedLoggerProps {
    helloFrom: string;
}

export const SharedLogger = ({ helloFrom }: SharedLoggerProps) => {
    useEffect(() => {
        console.log(`Hello from ${helloFrom}`);
    }, [helloFrom]);

    return null;
};