import { useEffect, useState } from 'react';

const screenResize = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ size, setSize ] = useState<number>(0);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const windowResizeHandler = () => setSize(window.innerWidth);

            windowResizeHandler();

            window.addEventListener('resize', windowResizeHandler);

            return () => window.removeEventListener('resize', windowResizeHandler);
        }
    }, []);

    return size;
};

export default screenResize;
