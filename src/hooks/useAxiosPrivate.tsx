import { useContext, useEffect } from "react";
import { axiosPublic } from "../../axios";
import { AuthContext } from "../context/AuthProvider";
import { useSWRConfig } from "swr";

export function useAxiosPrivate(){
    const {auth} = useContext(AuthContext);
    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            axiosPublic.interceptors.request.use(
                config => {
                    if(!config.headers['authorization'] && auth.authenticated===true){
                        config.headers['authorization'] = `Bearer ${auth.token}`;
                    }
                    return config;
                },
                (error) => Promise.reject(error)
            );
        }
        return () => {isMounted = false}
    }, [auth.authenticated])
    
    return axiosPublic;
}