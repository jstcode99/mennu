import { useEffect } from 'react';
import { useSessionStore } from '../stores/session.store';

export function useSessionInit() {
    const init = useSessionStore((s) => s.initFromCookies);

    useEffect(() => {
        init();
    }, [init]);
}
