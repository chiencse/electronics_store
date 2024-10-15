'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
 
function AuthenticateIndexPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/authenticate/login');
    }, []);

    return (
        <h1>Redirecting To Login Page</h1>
    );
}

export default AuthenticateIndexPage;