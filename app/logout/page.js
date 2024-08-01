'use client';
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "../appcontextprovider";

const logout = () => {
    const { setIslogin, setUser } = useContext(AppContext);

    const router = useRouter();
    useEffect(() => {
        sessionStorage.removeItem('shoppingToken');
        setIslogin(false);
        setUser(null);
        router.push('/');
    }, [])
}

export default logout;