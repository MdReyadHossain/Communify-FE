import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        sessionStorage.clear();
        router.push('/login');
    }, [])
    return (
        <>
            <h1>Redirecting to login...</h1>
        </>
    )
}

export default Logout
